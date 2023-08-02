import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Manager } from 'src/managers/manager.entity';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() managerData: Manager) {
    return this.authService.register(managerData);
  }
}
