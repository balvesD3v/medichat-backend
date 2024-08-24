import { Role } from '@prisma/client'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class UserDto {
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  password: string

  role: Role
}
