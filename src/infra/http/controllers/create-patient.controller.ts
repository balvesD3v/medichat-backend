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
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { RegisterPatientUseCase } from '@/domain/application/use-cases/register-patient.service'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'

const phoneValidation =
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/

const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const createPatientBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().regex(passwordValidation, {
    message:
      'Invalid phone number format. Please enter a valid Brazilian phone number.',
  }),
  phone: z.string().regex(phoneValidation),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  medicalHistory: z.string().optional(),
  emergencyContact: z.string(),
})

type CreatePatientAccountSchema = z.infer<typeof createPatientBodySchema>

@Controller('register-patient')
export class CreatePatientController {
  constructor(private readonly registerPatient: RegisterPatientUseCase) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPatientBodySchema))
  async create(@Body() body: CreatePatientAccountSchema) {
    const {
      email,
      name,
      password,
      phone,
      birthDate,
      medicalHistory,
      emergencyContact,
    } = body

    const result = await this.registerPatient.execute({
      name,
      email,
      password,
      phone,
      birthDate: new Date(birthDate),
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
