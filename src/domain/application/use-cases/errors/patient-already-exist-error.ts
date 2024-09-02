import { UseCaseError } from '@/core/errors/use-case-error'

export class PatientAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Patient "${identifier}" already exists`)
  }
}
