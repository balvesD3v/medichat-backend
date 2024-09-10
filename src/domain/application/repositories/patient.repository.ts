import { Patient } from '@/domain/enterprise/entities/patient'

export abstract class PatientRepository {
  abstract create(patient: Patient): Promise<void>
  abstract findByEmail(email: string): Promise<Patient | null>
  abstract save(patient: Patient, id: string): Promise<Patient | null>
}
