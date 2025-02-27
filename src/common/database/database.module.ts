import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { TeamEntity } from './entities/team.entity';
import { PlayerRepository } from './repositories/player.repository';
import { TeamRepository } from './repositories/team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, TeamEntity])],
  providers: [PlayerRepository, TeamRepository],
  exports: [TypeOrmModule, PlayerRepository, TeamRepository],
})
export class DatabaseModule {}
