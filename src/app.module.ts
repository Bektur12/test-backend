import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flat } from './flats/flat.entity';
import { Manager } from './managers/manager.entity';
import { FlatModule } from './flats/flat.module';
import { ManagerModule } from './managers/manager.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'node-react',
      password: 'node-react',
      database: 'node-react',
      entities: [Flat, Manager],
      synchronize: true,
    }),
    FlatModule,
    ManagerModule,
    AuthModule,
  ],
})
export class AppModule {}
