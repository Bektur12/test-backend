import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ManagerService } from '../managers/manager.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Manager } from 'src/managers/manager.entity';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private managerService: ManagerService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const manager = await this.validateUser(email, password);
    if (!manager) {
      throw new NotFoundException('Manager is not found!');
    }

    const payload = { email, id: manager.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(data: Manager) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newManager: Manager = { ...data, password: hashedPassword };
    return this.managerService.createManager(newManager);
  }

  async validateUser(email: string, password: string): Promise<Manager | null> {
    const manager = await this.managerService.findByEmail(email);

    if (manager && (await bcrypt.compare(password, manager.password))) {
      return manager;
    }

    return null;
  }
}
