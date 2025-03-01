import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRecordEntity } from './base-record.entity';
import { GeneratedTeamEntity } from './generated-team.entity';
import { TeamEntity } from './team.entity';
import { PlayerEntity } from './player.entity';

@Entity('team_player_combinations')
export class TeamPlayerCombinationEntity extends BaseRecordEntity {
  @ManyToOne(() => GeneratedTeamEntity, (generatedTeam) => generatedTeam.combinations)
  @JoinColumn({ name: 'generated_team_id' })
  generatedTeam: GeneratedTeamEntity;

  @ManyToOne(() => TeamEntity, (team) => team.combinations)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @ManyToOne(() => PlayerEntity, (player) => player.combinations)
  @JoinColumn({ name: 'player_id' })
  player: PlayerEntity;
}
