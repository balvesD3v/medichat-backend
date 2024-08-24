import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UsersRepository } from 'src/app/repositories/users/users.repository'
import { UserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(dto: UserDto): Promise<User> {
    const checkIfEmailOfUserExists = await this.repository.findEmail(dto.email)

    if (checkIfEmailOfUserExists) {
      throw new Error('User already exists!')
    }

    dto.password = await bcrypt.hash(dto.password, 10)
    const newUser = await this.repository.createUser(dto)

    return newUser
  }

  findAll() {
    return `This action returns all users`
  }

  findOne() {}

  update() {
    return `This action updates a user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
