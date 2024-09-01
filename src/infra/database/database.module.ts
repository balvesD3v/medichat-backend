import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PatientRepository } from '@/domain/application/repositories/patient.repository'
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PatientRepository,
      useClass: PrismaPatientRepository,
    },
  ],
  exports: [PrismaService, PatientRepository],
})
export class DatabaseModule {}
