import { Injectable } from '@nestjs/common'
import { PatientRepository } from '../repositories/patient.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Patient } from '@/domain/enterprise/entities/patient'

interface EditPatientUseCaseRequest {
  userId: string
  name: string
  email: string
  birthDate: string
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
    userId,
    name,
    birthDate,
    email,
  }: EditPatientUseCaseRequest): Promise<EditPatientUseCaseResponse> {
    const patient = await this.patientRepository.findByEmail(email)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    const updatedPatient = await this.patientRepository.save(patient, userId)

    return right({
      updatedPatient,
    })
  }
}
