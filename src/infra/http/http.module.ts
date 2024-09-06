import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreatePatientController } from './controllers/create-patient.controller'
import { RegisterPatientUseCase } from '@/domain/application/use-cases/register-patient.service'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterDoctorUseCase } from '@/domain/application/use-cases/register-doctor.service'
import { CreateDoctorController } from './controllers/create-doctor.controller'
import { AuthenticateDoctorUseCase } from '@/domain/application/use-cases/authenticate-doctor.service'
import { AuthenticateDoctorController } from './controllers/authenticate-doctor.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateDoctorController,
    CreatePatientController,
    AuthenticateDoctorController,
  ],
  providers: [
    RegisterPatientUseCase,
    RegisterDoctorUseCase,
    AuthenticateDoctorUseCase,
  ],
})
export class HttpModule {}
