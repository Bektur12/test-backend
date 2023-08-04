import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from './flat.entity';

@Injectable()
export class FlatService {
  constructor(
    @InjectRepository(Flat)
    private flatRepository: Repository<Flat>,
  ) {}

  async getAllFlats(title: string, status: string): Promise<Flat[]> {
    if (title === 'Все' && status === 'Все') {
      return this.flatRepository.find();
    }

    let queryBuilder = this.flatRepository.createQueryBuilder('flat');

    if (title !== 'Все') {
      queryBuilder = queryBuilder.where('flat.object = :object', {
        object: title,
      });
    }
    if (status !== 'Все' && status !== null) {
      queryBuilder = queryBuilder.andWhere('flat.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async getFlatById(id: number): Promise<Flat> {
    const flat = await this.flatRepository.findOne({ where: { id } });
    if (!flat) {
      throw new NotFoundException(`Flat with ID ${id} not found`);
    }
    return flat;
  }

  async createFlat(flatData: Partial<Flat>): Promise<Flat> {
    try {
      const newFlat = this.flatRepository.create(flatData);
      return this.flatRepository.save(newFlat);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async updateFlat(id: number, flatData: Flat): Promise<Flat> {
    await this.flatRepository.update(id, flatData);
    return this.flatRepository.findOneBy({ id });
  }

  async deleteFlat(id: number): Promise<void> {
    this.flatRepository.delete(id);
  }
}
