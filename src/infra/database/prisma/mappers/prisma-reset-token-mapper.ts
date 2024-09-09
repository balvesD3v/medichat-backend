import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PasswordResetToken } from '@/domain/enterprise/entities/PasswordResetToken '
import {
  Prisma,
  PasswordResetToken as PrismaPasswordResetToken,
} from '@prisma/client'

export class ResetTokenMapper {
  static toDomain(raw: PrismaPasswordResetToken): PasswordResetToken {
    return PasswordResetToken.create(
      {
        token: raw.token,
        expiresAt: raw.expiresAt,
        userId: new UniqueEntityId(raw.userId),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    passwordResetToken: PasswordResetToken,
  ): Prisma.PasswordResetTokenUncheckedCreateInput {
    return {
      id: passwordResetToken.id.toString(),
      token: passwordResetToken.token.toString(),
      userId: passwordResetToken.userId.toString(),
      expiresAt: passwordResetToken.expiresAt,
    }
  }
}
