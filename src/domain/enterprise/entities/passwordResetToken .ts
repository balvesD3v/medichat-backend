import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PasswordResetTokenProps {
  token: string
  expiresAt: Date
  userId: UniqueEntityId
}

export class PasswordResetToken extends Entity<PasswordResetTokenProps> {
  get token() {
    return this.props.token
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  get userId() {
    return this.props.userId
  }

  static create(props: PasswordResetTokenProps, id?: UniqueEntityId) {
    if (props.expiresAt <= new Date()) {
      throw new Error('Token has expired')
    }

    return new PasswordResetToken(props, id)
  }

  isValid() {
    return this.expiresAt > new Date()
  }
}
