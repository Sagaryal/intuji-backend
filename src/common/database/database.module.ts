import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { TeamEntity } from './entities/team.entity';
import { PlayerRepository } from './repositories/player.repository';
import { TeamRepository } from './repositories/team.repository';
import { GeneratedTeamEntity } from './entities/generated-team.entity';
import { GeneratedTeamRepository } from './repositories/generated-team.repository';
import { TeamPlayerCombinationEntity } from './entities/team-player-combination.entity';
import { TeamPlayerCombinationRepository } from './repositories/team-player-combination.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, TeamEntity, GeneratedTeamEntity, TeamPlayerCombinationEntity])],
  providers: [PlayerRepository, TeamRepository, GeneratedTeamRepository, TeamPlayerCombinationRepository],
  exports: [TypeOrmModule, PlayerRepository, TeamRepository, GeneratedTeamRepository, TeamPlayerCombinationRepository],
})
export class DatabaseModule {}
