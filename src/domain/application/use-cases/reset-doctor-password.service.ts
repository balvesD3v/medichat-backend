import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { DoctorRepository } from '../repositories/doctor.repository'
import { Either, left } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { v4 as uuidv4 } from 'uuid'

interface ResetDoctorPasswordServiceRequest {
  doctorId: string
  email: string
}

type ResetDoctorPasswordServiceResponse = Either<WrongCredentialsError, void>

@Injectable()
export class ResetDoctorPasswordService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async sendResetPasswordLink({
    doctorId,
    email,
  }: ResetDoctorPasswordServiceRequest): Promise<ResetDoctorPasswordServiceResponse> {
    const doctor = await this.doctorRepository.findByEmail(email)

    if (!doctor) {
      return left(new WrongCredentialsError())
    }

    const token = uuidv4
    const tokenAsString = String(token)
    await this.doctorRepository.saveResetToken(doctorId, tokenAsString)
  }
}
