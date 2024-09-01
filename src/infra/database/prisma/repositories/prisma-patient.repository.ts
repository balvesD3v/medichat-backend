import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PatientRepository } from '@/domain/application/repositories/patient.repository'
import { Patient } from '@/domain/enterprise/entities/patient'
import { PrismaPatientMapper } from '../mappers/prisma-patient-mapper'

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(patient: Patient): Promise<void> {
    const userData = PrismaPatientMapper.toPrismaUser(patient)

    const createdUser = await this.prisma.user.create({
      data: userData,
    })

    const patientData = PrismaPatientMapper.toPrismaPatient(patient)
    await this.prisma.patient.create({
      data: {
        ...patientData,
        userId: createdUser.id,
      },
    })
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        patient: true,
      },
    })

    if (!user) {
      return null
    }

    return PrismaPatientMapper.toDomain(user, user.patient)
  }
}
