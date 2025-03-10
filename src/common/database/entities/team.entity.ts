import { Entity, Column, OneToMany } from 'typeorm';
import { BaseRecordEntity } from './base-record.entity';
import { TeamPlayerCombinationEntity } from './team-player-combination.entity';

@Entity('teams')
export class TeamEntity extends BaseRecordEntity {
  @Column()
  name: string;

  @OneToMany(() => TeamPlayerCombinationEntity, (combination) => combination.team)
  combinations: TeamPlayerCombinationEntity[];
}
