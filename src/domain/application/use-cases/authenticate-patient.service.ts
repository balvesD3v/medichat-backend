import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { PatientRepository } from '../repositories/patient.repository'

interface AuthenticatePatientUseCaseRequest {
  email: string
  password: string
}

type AuthenticatePatientUseCaseRespose = Either<
  WrongCredentialsError,
  {
    acessToken: string
  }
>

@Injectable()
export class AuthenticatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticatePatientUseCaseRequest): Promise<AuthenticatePatientUseCaseRespose> {
    const patient = await this.patientRepository.findByEmail(email)

    if (!patient) {
      return left(new WrongCredentialsError())
    }

    const isValidPassword = await this.hashCompare.compare(
      password,
      patient.password,
    )

    if (!isValidPassword) {
      return left(new WrongCredentialsError())
    }

    const acessToken = await this.encrypter.encrypt({
      sub: patient.id.toString(),
    })

    return right({ acessToken })
  }
}
