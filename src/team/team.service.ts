import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamEntity } from '../common/database/entities/team.entity';
import { CreateTeamDto, GenerateTeamDto, TeamDto, UpdateTeamDto } from './dtos/team.dto';
import { TeamRepository } from '../common/database/repositories/team.repository';
import { PlayerRepository } from '../common/database/repositories/player.repository';
import { GeneratedTeamRepository } from '../common/database/repositories/generated-team.repository';
import { TeamPlayerCombinationRepository } from '../common/database/repositories/team-player-combination.repository';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly generatedTeamRepository: GeneratedTeamRepository,
    private readonly teamPlayerCombinationRepository: TeamPlayerCombinationRepository,
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

  async generateTeams(generateTeamDto: GenerateTeamDto): Promise<any> {
    const { title } = generateTeamDto;

    const players = await this.playerRepository.find();
    const teams = await this.teamRepository.find();

    if (teams.length === 0) {
      throw new NotFoundException('No teams available.');
    }

    players.sort((a, b) => b.skill - a.skill);

    const teamAssignments: Record<string, any[]> = {};
    teams.forEach((team) => (teamAssignments[team.name] = []));

    let index = 0;
    players.forEach((player) => {
      const teamName = teams[index % teams.length].name;
      teamAssignments[teamName].push(player);
      index++;
    });

    const uniqueId = this.generateUniqueId();

    const generatedTeam = this.generatedTeamRepository.create({
      uniqueId: uniqueId,
      title: title,
    });

    await this.generatedTeamRepository.save(generatedTeam);

    const teamPlayerCombinations = [];
    const teamResults: Record<string, any[]> = {};

    for (const team of teams) {
      const playerDetails = [];

      for (const player of teamAssignments[team.name]) {
        const teamPlayerCombination = this.teamPlayerCombinationRepository.create({
          generatedTeam: generatedTeam,
          team: team,
          player: player,
        });

        playerDetails.push({
          id: player.id,
          createdAt: player.createdAt.toISOString(),
          updatedAt: player.updatedAt.toISOString(),
          deletedAt: player.deletedAt ? player.deletedAt.toISOString() : null,
          name: player.name,
          skill: player.skill,
        });

        teamPlayerCombinations.push(teamPlayerCombination);
      }

      teamResults[team.name] = playerDetails;
    }

    await this.teamPlayerCombinationRepository.save(teamPlayerCombinations);

    return {
      uniqueId,
      title,
      generatedTeam,
      teams: teamResults,
    };
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).slice(2, 11);
  }

  async getGeneratedTeam(uniqueId: string): Promise<any> {
    const generatedTeam = await this.generatedTeamRepository.findOne({
      where: { uniqueId },
      relations: ['combinations', 'combinations.team', 'combinations.player'],
    });

    if (!generatedTeam) {
      throw new NotFoundException('Generated team not found.');
    }

    const teamAssignments = {};

    generatedTeam.combinations.forEach((combination) => {
      const teamName = combination.team.name;
      if (!teamAssignments[teamName]) {
        teamAssignments[teamName] = [];
      }

      const player = combination.player;
      teamAssignments[teamName].push({
        id: player.id,
        createdAt: player.createdAt,
        updatedAt: player.updatedAt,
        deletedAt: player.deletedAt,
        name: player.name,
        skill: player.skill,
      });
    });

    return {
      title: generatedTeam.title,
      uniqueId: generatedTeam.uniqueId,
      teams: teamAssignments,
    };
  }
}
