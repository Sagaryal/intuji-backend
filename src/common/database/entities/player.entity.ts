import { Entity, Column } from 'typeorm';
import { BaseRecordEntity } from './base-record.entity';

@Entity('players')
export class PlayerEntity extends BaseRecordEntity {
  @Column()
  name: string;

  @Column({ type: 'int', default: 1 })
  skill: number;
}
