import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { PatientRepository } from '../repositories/patient.repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { PatientAlreadyExistsError } from './errors/patient-already-exist-error'
import { Patient } from '@/domain/enterprise/entities/patient'

interface RegisterPatientUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  birthDate: Date
  medicalHistory: string
  emergencyContact: string
}

type RegisterPatientUseCaseResponse = Either<
  PatientAlreadyExistsError,
  {
    patient: Patient
  }
>

@Injectable()
export class RegisterPatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    birthDate,
    medicalHistory,
    emergencyContact,
  }: RegisterPatientUseCaseRequest): Promise<RegisterPatientUseCaseResponse> {
    const patientWithSameEmail = await this.patientRepository.findByEmail(email)

    if (patientWithSameEmail) {
      return left(new PatientAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const patient = Patient.create({
      name,
      email,
      password: hashedPassword,
      phone,
      birthDate,
      medicalHistory,
      emergencyContact,
    })

    await this.patientRepository.create(patient)

    return right({
      patient,
    })
  }
}
