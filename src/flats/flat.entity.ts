import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  clientNumber: string;

  @Column()
  contractNumber: string;

  @Column({ default: 'Активна' })
  status: string;

  @Column({ nullable: true, default: null })
  object: string | null;

  @Column({ nullable: true, default: null })
  price: string | null;

  @Column({ nullable: true, default: null })
  floor: string | null;
}
