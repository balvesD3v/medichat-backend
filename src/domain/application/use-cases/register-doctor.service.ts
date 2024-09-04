import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { DoctorAlreadyExistsError } from './errors/doctor-already-exist-error'
import { Doctor } from '@/domain/enterprise/entities/doctor'
import { DoctorRepository } from '../repositories/doctor.repository'

interface RegisterDoctorUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  graduateDiploma: string
  medicalResidencyCertificate: string
  professionalRegistration: string
  certificateOfSpecialization: string
  clinicAddress: string
  specialization: string[]
  availableTimes: string[]
  role: string
}

type RegisterDoctorUseCaseResponse = Either<
  DoctorAlreadyExistsError,
  {
    doctor: Doctor
  }
>

@Injectable()
export class RegisterDoctorUseCase {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
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
  }: RegisterDoctorUseCaseRequest): Promise<RegisterDoctorUseCaseResponse> {
    const doctorWithSameEmail = await this.doctorRepository.findByEmail(email)

    if (doctorWithSameEmail) {
      return left(new DoctorAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const doctor = Doctor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      graduateDiploma,
      medicalResidencyCertificate,
      professionalRegistration,
      certificateOfSpecialization,
      clinicAddress,
      specialization,
      availableTimes,
    })

    await this.doctorRepository.create(doctor)

    return right({
      doctor,
    })
  }
}
