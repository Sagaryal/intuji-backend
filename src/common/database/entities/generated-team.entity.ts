import { Entity, Column, OneToMany } from 'typeorm';
import { BaseRecordEntity } from './base-record.entity';
import { TeamPlayerCombinationEntity } from './team-player-combination.entity';

@Entity('generated_teams')
export class GeneratedTeamEntity extends BaseRecordEntity {
  @Column({ unique: true })
  uniqueId: string;

  @Column({ default: 'Untitled Team' })
  title: string;

  @OneToMany(() => TeamPlayerCombinationEntity, (combination) => combination.generatedTeam)
  combinations: TeamPlayerCombinationEntity[];
}
