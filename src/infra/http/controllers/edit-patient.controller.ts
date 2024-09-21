import { EditPatientUseCase } from '@/domain/application/use-cases/edit-patient.service'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { z } from 'zod'
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createPatientBodySchema = z.object({
  userId: z.string(),
  email: z.string().email(),
})

type EditPatientAccountSchema = z.infer<typeof createPatientBodySchema>

@Controller('edit-patient')
export class EditPatientController {
  constructor(private readonly editPatient: EditPatientUseCase) {}

  @Put(':id')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPatientBodySchema))
  async update(
    @Body() body: EditPatientAccountSchema,
    @CurrentUser() user: UserPayload,
    @Param('id') patientId: string,
  ) {
    const { email } = body
    const userId = user.sub

    const result = await this.editPatient.execute({ email, userId, patientId })

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
