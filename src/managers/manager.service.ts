import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  async findByEmail(email: string): Promise<Manager | null> {
    return this.managerRepository.findOne({ where: { email } });
  }

  async getAllManagers(): Promise<Manager[]> {
    return this.managerRepository.find();
  }

  async getManagerById(id: number): Promise<Manager> {
    return this.managerRepository.findOne({ where: { id } });
  }

  async createManager(managerData: Partial<Manager>): Promise<Manager> {
    const newManager = this.managerRepository.create(managerData);
    return this.managerRepository.save(newManager);
  }

  async updateManager(id: number, managerData: Manager): Promise<Manager> {
    const manager = await this.managerRepository.findOneBy({ id });
    if (!manager) throw new NotFoundException();

    manager.fullName = managerData.fullName;
    manager.phone = managerData.phone;
    manager.email = managerData.email;
    return this.managerRepository.save(manager);
  }

  async deleteManager(id: number): Promise<void> {
    await this.managerRepository.delete(id);
  }
}
