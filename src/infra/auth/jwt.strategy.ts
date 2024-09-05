import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { z } from 'zod'
import { EnvService } from '../env/env.service'
import { ExtractJwt, Strategy } from 'passport-jwt'

const tokenPayloadSchema = z.object({
  sub: z.string().cuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['R256'],
    })
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
