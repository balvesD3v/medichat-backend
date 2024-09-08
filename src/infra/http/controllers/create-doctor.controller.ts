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
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { RegisterDoctorUseCase } from '@/domain/application/use-cases/register-doctor.service'
import { Public } from '@/infra/auth/public'

const createDoctorBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  graduateDiploma: z.string(),
  medicalResidencyCertificate: z.string(),
  professionalRegistration: z.string(),
  certificateOfSpecialization: z.string(),
  clinicAddress: z.string(),
  specialization: z.array(z.string()),
  availableTimes: z.array(z.string()),
})

type CreateDoctorSchema = z.infer<typeof createDoctorBodySchema>

@Controller('register-doctor')
export class CreateDoctorController {
  constructor(private readonly registerDoctor: RegisterDoctorUseCase) {}

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDoctorBodySchema))
  async create(@Body() body: CreateDoctorSchema) {
    const {
      email,
      name,
      password,
      phone,
      graduateDiploma,
      medicalResidencyCertificate,
      professionalRegistration,
      certificateOfSpecialization,
      clinicAddress,
      specialization,
      availableTimes,
    } = body

    const result = await this.registerDoctor.execute({
      name,
      email,
      password,
      phone,
      graduateDiploma,
      medicalResidencyCertificate,
      professionalRegistration,
      certificateOfSpecialization,
      clinicAddress,
      specialization,
      availableTimes,
      role: 'DOCTOR',
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
