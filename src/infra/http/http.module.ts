import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { PatientController } from './controllers/create-patient.controller'
import { RegisterPatientUseCase } from '@/domain/application/use-cases/register-patient.service'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterDoctorUseCase } from '@/domain/application/use-cases/register-doctor.service'
import { DoctorController } from './controllers/create-doctor.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [PatientController, DoctorController],
  providers: [RegisterPatientUseCase, RegisterDoctorUseCase],
})
export class HttpModule {}
