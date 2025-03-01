import { Entity, Column, OneToMany } from 'typeorm';
import { BaseRecordEntity } from './base-record.entity';
import { TeamPlayerCombinationEntity } from './team-player-combination.entity';

@Entity('players')
export class PlayerEntity extends BaseRecordEntity {
  @Column()
  name: string;

  @Column({ type: 'int', default: 1 })
  skill: number;

  @OneToMany(() => TeamPlayerCombinationEntity, (combination) => combination.player)
  combinations: TeamPlayerCombinationEntity[];
}
