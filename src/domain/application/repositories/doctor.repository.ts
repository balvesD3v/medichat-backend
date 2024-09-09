import { Doctor } from '@/domain/enterprise/entities/doctor'

export abstract class DoctorRepository {
  abstract create(doctor: Doctor): Promise<void>
  abstract findByEmail(email: string): Promise<Doctor | null>
}
