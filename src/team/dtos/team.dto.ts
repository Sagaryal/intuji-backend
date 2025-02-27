import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { TeamEntity } from '../../common/database/entities/team.entity';
import { transformToDto } from '../../common/utils/utils';

export class CreateTeamDto {
  @IsNotEmpty()
  @Expose()
  name: string;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class TeamDto extends CreateTeamDto {
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id: string;

  static fromEntity(entity: TeamEntity): TeamDto;
  static fromEntity(entity: TeamEntity[]): TeamDto[];
  static fromEntity(entity: TeamEntity | TeamEntity[]): TeamDto | TeamDto[] {
    return transformToDto(this, entity);
  }
}
