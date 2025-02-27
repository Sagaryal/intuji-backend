import { IsInt, IsNotEmpty, Min, Max, IsUUID } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PlayerEntity } from '../../common/database/entities/player.entity';
import { transformToDto } from '../../common/utils/utils';
import { PartialType } from '@nestjs/swagger';

export class CreatePlayerDto {
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @Expose()
  skill: number;
}

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}

export class PlayerDto extends CreatePlayerDto {
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id: string;

  static fromEntity(entity: PlayerEntity): PlayerDto;
  static fromEntity(entity: PlayerEntity[]): PlayerDto[];
  static fromEntity(entity: PlayerEntity | PlayerEntity[]): PlayerDto | PlayerDto[] {
    return transformToDto(this, entity);
  }
}
