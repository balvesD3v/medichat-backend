import { EditPatientUseCase } from '@/domain/application/use-cases/edit-patient.service'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { z } from 'zod'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'

const createPatientBodySchema = z.object({
  userId: z.string(),
  email: z.string(),
})

type EditPatientAccountSchema = z.infer<typeof createPatientBodySchema>

@Controller('edit-patient')
export class EditPatientController {
  constructor(private readonly editPatient: EditPatientUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPatientBodySchema))
  async create(@Body() body: EditPatientAccountSchema) {
    const { email, userId } = body

    const result = await this.editPatient.execute({ email, userId })

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
