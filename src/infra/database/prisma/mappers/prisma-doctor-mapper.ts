import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Doctor } from '@/domain/enterprise/entities/doctor'
import {
  User as PrismaUser,
  Doctor as PrismaDoctor,
  Prisma,
} from '@prisma/client'

export class PrismaDoctorMapper {
  static toDomain(user: PrismaUser, doctor: PrismaDoctor): Doctor {
    return Doctor.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        certificateOfSpecialization: doctor.certificateOfSpecialization,
        clinicAddress: doctor.clinicAddress,
        graduateDiploma: doctor.graduateDiploma,
        medicalResidencyCertificate: doctor.medicalResidencyCertificate,
        professionalRegistration: doctor.professionalRegistration,
        availableTimes: doctor.availableTimes,
        specialization: doctor.specialization,
      },
      new UniqueEntityId(user.id),
    )
  }

  static toPrismaUser(Doctor: Doctor): Prisma.UserUncheckedCreateInput {
    return {
      id: Doctor.id.toString(),
      name: Doctor.name.toString(),
      email: Doctor.email.toString(),
      password: Doctor.password,
      phone: Doctor.phone,
    }
  }

  static toPrismaDoctor(doctor: Doctor): Prisma.DoctorUncheckedCreateInput {
    return {
      id: doctor.id.toString(),
      certificateOfSpecialization:
        doctor.certificateOfSpecialization.toString(),
      clinicAddress: doctor.clinicAddress.toString(),
      graduateDiploma: doctor.graduateDiploma.toString(),
      medicalResidencyCertificate:
        doctor.medicalResidencyCertificate.toString(),
      professionalRegistration: doctor.professionalRegistration.toString(),
      availableTimes: doctor.availableTimes,
      specialization: doctor.specialization,
      userId: doctor.id.toString(),
    }
  }
}
