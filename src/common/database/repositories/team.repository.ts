import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TeamEntity } from '../entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TeamRepository extends Repository<TeamEntity> {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
  ) {
    super(teamRepository.target, teamRepository.manager, teamRepository.queryRunner);
  }

  public async store(teamData: Partial<TeamEntity>): Promise<TeamEntity> {
    const team = this.teamRepository.create(teamData);

    return this.teamRepository.save(team);
  }

  public async findById(id: string): Promise<TeamEntity> {
    const team: TeamEntity = await this.teamRepository.findOne({ where: { id } });

    if (!team) {
      throw new NotFoundException('Team not found!');
    }

    return team;
  }

  public async updateOne(id: string, teamData: Partial<TeamEntity>): Promise<TeamEntity> {
    const team = await this.findById(id);

    if (!team) {
      throw new NotFoundException('Team not found!');
    }

    await this.teamRepository.update(id, teamData);
    return this.findById(id);
  }
}
