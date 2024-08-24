import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './app/modules/users/users.module'

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
