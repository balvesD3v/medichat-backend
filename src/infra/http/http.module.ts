import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { PatientController } from './controllers/patient.controller'
import { RegisterPatientUseCase } from '@/domain/application/use-cases/register-patient.service'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [PatientController],
  providers: [RegisterPatientUseCase],
})
export class HttpModule {}
