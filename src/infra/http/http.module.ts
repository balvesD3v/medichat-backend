import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreatePatientController } from './controllers/create-patient.controller'
import { RegisterPatientUseCase } from '@/domain/application/use-cases/register-patient.service'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { RegisterDoctorUseCase } from '@/domain/application/use-cases/register-doctor.service'
import { CreateDoctorController } from './controllers/create-doctor.controller'
import { AuthenticateDoctorUseCase } from '@/domain/application/use-cases/authenticate-doctor.service'
import { AuthenticateDoctorController } from './controllers/authenticate-doctor.controller'
import { AuthenticatePatientController } from './controllers/authenticate-patient.controller'
import { AuthenticatePatientUseCase } from '@/domain/application/use-cases/authenticate-patient.service'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateDoctorController,
    CreatePatientController,
    AuthenticateDoctorController,
    AuthenticatePatientController,
  ],
  providers: [
    RegisterPatientUseCase,
    RegisterDoctorUseCase,
    AuthenticateDoctorUseCase,
    AuthenticatePatientUseCase,
  ],
})
export class HttpModule {}
