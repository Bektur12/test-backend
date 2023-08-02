import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { Manager } from './manager.entity';

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Get()
  async getAllManagers(): Promise<Manager[]> {
    return this.managerService.getAllManagers();
  }

  @Get(':id')
  async getManagerById(@Param('id') id: number): Promise<Manager> {
    return this.managerService.getManagerById(id);
  }

  @Post()
  async createManager(@Body() managerData: Manager): Promise<Manager> {
    return this.managerService.createManager(managerData);
  }

  @Put(':id')
  async updateManager(
    @Param('id') id: number,
    @Body() managerData: Manager,
  ): Promise<Manager> {
    return this.managerService.updateManager(id, managerData);
  }

  @Delete(':id')
  async deleteManager(@Param('id') id: number): Promise<void> {
    return this.managerService.deleteManager(id);
  }
}
