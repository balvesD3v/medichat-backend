import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaModule } from 'src/app/database/prisma.module'
import { UsersRepository } from 'src/app/repositories/users/users.repository'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
