import { Injectable } from '@nestjs/common'
import { PatientRepository } from '../repositories/patient.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Patient } from '@/domain/enterprise/entities/patient'

interface EditPatientUseCaseRequest {
  patientId: string
  email: string
}

type EditPatientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    patient: Patient
  }
>

@Injectable()
export class EditPatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute({
    patientId,
    email,
  }: EditPatientUseCaseRequest): Promise<EditPatientUseCaseResponse> {
    const patient = await this.patientRepository.findByEmail(email)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    await this.patientRepository.update(patient, patientId)

    return right({
      patient,
    })
  }
}
