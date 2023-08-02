import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ManagerModule } from '../managers/manager.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './local.strategy'; // Импортируем JwtStrategy
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    ManagerModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
