import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamEntity } from '../common/database/entities/team.entity';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dtos/team.dto';
import { TeamRepository } from '../common/database/repositories/team.repository';
import { PlayerRepository } from '../common/database/repositories/player.repository';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<TeamDto> {
    const teamEntity: TeamEntity = await this.teamRepository.store(createTeamDto);
    return TeamDto.fromEntity(teamEntity);
  }

  async findAll(): Promise<TeamDto[]> {
    const teamEntities: TeamEntity[] = await this.teamRepository.find();
    return TeamDto.fromEntity(teamEntities);
  }

  async findById(id: string): Promise<TeamDto> {
    const teamEntity: TeamEntity = await this.teamRepository.findById(id);
    return TeamDto.fromEntity(teamEntity);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<TeamDto> {
    const teamEntity: TeamEntity = await this.teamRepository.updateOne(id, updateTeamDto);
    return TeamDto.fromEntity(teamEntity);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.teamRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException('Team not found');
    return { message: `Given team with id: ${id} has been deleted` };
  }

  async generateTeams(): Promise<any> {
    const players = await this.playerRepository.find();
    const teams = await this.teamRepository.find();

    if (teams.length === 0) {
      throw new NotFoundException('No teams available.');
    }

    // Sort players by skill level (descending)
    players.sort((a, b) => b.skill - a.skill);

    const teamAssignments: Record<string, any[]> = {};
    teams.forEach((team) => (teamAssignments[team.name] = []));

    // Distribute players in a round-robin fashion
    let index = 0;
    players.forEach((player) => {
      const teamName = teams[index % teams.length].name;
      teamAssignments[teamName].push(player);
      index++;
    });

    return teamAssignments;
  }
}
