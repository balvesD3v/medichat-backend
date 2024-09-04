import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface DoctorProps {
  name: string
  email: string
  password: string
  phone: string
  graduateDiploma: string
  medicalResidencyCertificate: string
  professionalRegistration: string
  certificateOfSpecialization: string
  clinicAddress: string
  specialization: string[]
  availableTimes: string[]
}

export class Doctor extends Entity<DoctorProps> {
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

  get graduateDiploma() {
    return this.props.graduateDiploma
  }

  get medicalResidencyCertificate() {
    return this.props.medicalResidencyCertificate
  }

  get professionalRegistration() {
    return this.props.professionalRegistration
  }

  get certificateOfSpecialization() {
    return this.props.certificateOfSpecialization
  }

  get clinicAddress() {
    return this.props.clinicAddress
  }

  get specialization() {
    return this.props.specialization
  }

  get availableTimes() {
    return this.props.availableTimes
  }

  static create(props: DoctorProps, id?: UniqueEntityId) {
    const doctor = new Doctor(props, id)

    return doctor
  }
}
