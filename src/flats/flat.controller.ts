import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FlatService } from './flat.service';
import { Flat } from './flat.entity';

@Controller('flats')
export class FlatController {
  constructor(private flatService: FlatService) {}

  @Get('/:title/:status')
  getAllFlats(
    @Param('title') title: string,
    @Param('status') status: string,
  ): Promise<Flat[]> {
    return this.flatService.getAllFlats(title, status);
  }

  @Get(':id')
  getFlatById(@Param('id') id: number): Promise<Flat> {
    return this.flatService.getFlatById(id);
  }

  @Post()
  createFlat(@Body() flatData: Partial<Flat>): Promise<Flat> {
    return this.flatService.createFlat(flatData);
  }

  @Put(':id')
  updateFlat(@Param('id') id: number, @Body() flatData: Flat): Promise<Flat> {
    return this.flatService.updateFlat(id, flatData);
  }

  @Delete(':id')
  deleteFlat(@Param('id') id: number): Promise<void> {
    return this.flatService.deleteFlat(id);
  }
}
