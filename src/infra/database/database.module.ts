import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PatientRepository } from '@/domain/application/repositories/patient.repository'
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient.repository'
import { DoctorRepository } from '@/domain/application/repositories/doctor.repository'
import { PrismaDoctorRepository } from './prisma/repositories/prisma-doctor.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PatientRepository,
      useClass: PrismaPatientRepository,
    },
    {
      provide: DoctorRepository,
      useClass: PrismaDoctorRepository,
    },
  ],
  exports: [PrismaService, PatientRepository, DoctorRepository],
})
export class DatabaseModule {}
