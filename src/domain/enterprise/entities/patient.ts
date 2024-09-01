import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PatientProps {
  name: string
  email: string
  password: string
  phone: string
  birthDate: Date | null
  medicalHistory: string | null
  emergencyContact: string | null
}

export class Patient extends Entity<PatientProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  get birthDate() {
    return this.props.birthDate
  }

  get medicalHistory() {
    return this.props.medicalHistory
  }

  get emergencyContact() {
    return this.props.emergencyContact
  }

  static create(props: PatientProps, id?: UniqueEntityId) {
    const patient = new Patient(props, id)

    return patient
  }
}
