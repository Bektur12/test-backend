import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './flat.entity';
import { FlatController } from './flat.controller';
import { FlatService } from './flat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flat])],
  controllers: [FlatController],
  providers: [FlatService],
})
export class FlatModule {}
