import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { AuthController } from './modules/auth/auth.controller'

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
