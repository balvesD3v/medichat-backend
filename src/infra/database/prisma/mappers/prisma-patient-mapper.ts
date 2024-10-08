import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Patient } from '@/domain/enterprise/entities/patient'
import {
  User as PrismaUser,
  Patient as PrismaPatient,
  Prisma,
} from '@prisma/client'

export class PrismaPatientMapper {
  static toDomain(user: PrismaUser, patient: PrismaPatient): Patient {
    return Patient.create(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        birthDate: patient.birthDate ? new Date(patient.birthDate) : null,
        medicalHistory: patient.medicalHistory,
        emergencyContact: patient.emergencyContact,
      },
      new UniqueEntityId(user.id),
    )
  }

  static toPrismaUser(patient: Patient): Prisma.UserUncheckedCreateInput {
    return {
      id: patient.id.toString(),
      name: patient.name.toString(),
      email: patient.email.toString(),
      password: patient.password,
      phone: patient.phone,
    }
  }

  static toPrismaPatient(patient: Patient): Prisma.PatientUncheckedCreateInput {
    return {
      id: patient.id.toString(),
      birthDate: patient.birthDate,
      emergencyContact: patient.emergencyContact.toString(),
      medicalHistory: patient.medicalHistory
        ? patient.medicalHistory.toString()
        : null,
    }
  }
}
