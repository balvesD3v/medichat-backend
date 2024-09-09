import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DoctorRepository } from '@/domain/application/repositories/doctor.repository'
import { Doctor } from '@/domain/enterprise/entities/doctor'
import { PrismaDoctorMapper } from '../mappers/prisma-doctor-mapper'

@Injectable()
export class PrismaDoctorRepository implements DoctorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(doctor: Doctor): Promise<void> {
    const userData = PrismaDoctorMapper.toPrismaUser(doctor)

    const createdUser = await this.prisma.user.create({
      data: userData,
    })

    const doctorData = PrismaDoctorMapper.toPrismaDoctor(doctor)
    await this.prisma.doctor.create({
      data: {
        ...doctorData,
        userId: createdUser.id,
      },
    })
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        doctor: true,
      },
    })

    if (!user || !user.doctor) {
      return null
    }

    return PrismaDoctorMapper.toDomain(user, user.doctor)
  }

  async saveResetToken(userId: string, token: string): Promise<void> {
    await this.prisma.passwordResetToken.upsert({
      where: { userId },
      update: {
        token,
        expiresAt: new Date(Date.now() + 3600000),
      },
      create: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 3600000),
      },
    })
  }
}
