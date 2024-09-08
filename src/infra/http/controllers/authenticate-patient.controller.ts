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
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { AuthenticatePatientUseCase } from '@/domain/application/use-cases/authenticate-patient.service'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const authPatientBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

type AuthPatientBodySchema = z.infer<typeof authPatientBodySchema>

@Controller('auth-patient')
@Public()
export class AuthenticatePatientController {
  constructor(
    private readonly authenticatePatient: AuthenticatePatientUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authPatientBodySchema))
  async handle(@Body() body: AuthPatientBodySchema) {
    const { email, password } = body

    const result = await this.authenticatePatient.execute({
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
}
