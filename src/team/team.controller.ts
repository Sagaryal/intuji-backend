import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, TeamDto, UpdateTeamDto } from './dtos/team.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Post('/generate-teams')
  async generateTeams() {
    return this.teamService.generateTeams();
  }

  @Get('generated-teams/:uniqueId')
  async getGeneratedTeam(@Param('uniqueId') uniqueId: string): Promise<any> {
    return this.teamService.getGeneratedTeam(uniqueId);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<TeamDto> {
    return this.teamService.findById(id);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamService.delete(id);
  }
}
