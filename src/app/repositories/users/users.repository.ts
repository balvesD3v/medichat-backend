import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/app/database/prisma.service'
import { UserDto } from 'src/app/modules/users/dto/create-user.dto'

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: UserDto): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
        role: 'PATIENT',
      },
    })
  }

  async findEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
    })
  }
}
