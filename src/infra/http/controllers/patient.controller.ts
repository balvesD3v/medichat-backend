import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidaionPipe } from '../pipes/zod-validation.pipe'
import { RegisterPatientUseCase } from '@/domain/application/use-cases/register-patient.service'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  birthDate: z.date(),
  medicalHistory: z.string(),
  emergencyContact: z.string(),
})

type CreateAccountSchema = z.infer<typeof createAccountBodySchema>

@Controller('patient')
export class PatientController {
  constructor(private readonly registerPatient: RegisterPatientUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidaionPipe(createAccountBodySchema))
  async create(@Body() body: CreateAccountSchema) {
    const {
      email,
      name,
      password,
      phone,
      birthDate,
      medicalHistory,
      emergencyContact,
    } = createAccountBodySchema.parse(body)

    const result = await this.registerPatient.execute({
      name,
      email,
      password,
      phone,
      birthDate,
      medicalHistory,
      emergencyContact,
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
  }
}
