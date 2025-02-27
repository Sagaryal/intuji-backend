import { Entity, Column } from 'typeorm';
import { BaseRecordEntity } from './base-record.entity';

@Entity('teams')
export class TeamEntity extends BaseRecordEntity {
  @Column()
  name: string;
}
