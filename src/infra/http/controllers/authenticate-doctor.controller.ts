import { AuthenticateDoctorUseCase } from '@/domain/application/use-cases/authenticate-doctor.service'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'

const authDoctorBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

type AuthDoctorBodySchema = z.infer<typeof authDoctorBodySchema>

@Controller('auth-doctor')
@Public()
export class AuthenticateDoctorController {
  constructor(private readonly authenticateDoctor: AuthenticateDoctorUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authDoctorBodySchema))
  async handle(@Body() body: AuthDoctorBodySchema) {
    const { email, password } = body

    const result = await this.authenticateDoctor.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { acessToken } = result.value

    return {
      email,
      password,
      acess_token: acessToken,
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {}
}
