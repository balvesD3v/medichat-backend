import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './app/modules/users/users.module'
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [AuthModule, UsersModule, DoctorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
