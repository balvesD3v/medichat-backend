import { Injectable } from '@nestjs/common'
import { DoctorRepository } from '../repositories/doctor.repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateDoctorUseCaseRequest {
  email: string
  password: string
}

type AuthenticateDoctorUseCaseRespose = Either<
  WrongCredentialsError,
  {
    acessToken: string
  }
>

@Injectable()
export class AuthenticateDoctorUseCase {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateDoctorUseCaseRequest): Promise<AuthenticateDoctorUseCaseRespose> {
    const doctor = await this.doctorRepository.findByEmail(email)

    if (!doctor) {
      return left(new WrongCredentialsError())
    }

    const isValidPassword = await this.hashCompare.compare(
      password,
      doctor.password,
    )

    if (!isValidPassword) {
      return left(new WrongCredentialsError())
    }

    const acessToken = await this.encrypter.encrypt({
      sub: doctor.id.toString(),
    })

    return right({ acessToken })
  }
}
