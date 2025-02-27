import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

// Borrow dotenv from @nestjs/config to be able to use env vars here, before ConfigModule loads them
import * as dotenv from 'dotenv';
dotenv.config();

export const TYPEORM_OPTIONS: Readonly<TypeOrmModuleOptions> = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_AUTO_SYNC_SCHEMA === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  dropSchema: false,
  cache: false,
  migrationsRun: process.env.DATABASE_AUTO_MIGRATE === 'true',
  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname + '/src/database/migrations/**/*{.ts,.js}')],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
  entities: [path.join(__dirname + `/**/*.entity{.ts,.js}`)],
};

export const dataSource =
  process.env.TYPEORM_CLI === 'true' ? new DataSource(<DataSourceOptions>TYPEORM_OPTIONS) : undefined;
