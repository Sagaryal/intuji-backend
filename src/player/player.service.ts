import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerEntity } from '../common/database/entities/player.entity';
import { CreatePlayerDto, PlayerDto, UpdatePlayerDto } from './dtos/player.dto';
import { PlayerRepository } from '../common/database/repositories/player.repository';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<PlayerDto> {
    const playerEntity: PlayerEntity = await this.playerRepository.store(createPlayerDto);
    return PlayerDto.fromEntity(playerEntity);
  }

  async findAll(): Promise<PlayerDto[]> {
    const playerEntities: PlayerEntity[] = await this.playerRepository.find({
      order: { createdAt: 'ASC' },
    });
    return PlayerDto.fromEntity(playerEntities);
  }

  async findById(id: string): Promise<PlayerDto> {
    const playerEntity: PlayerEntity = await this.playerRepository.findById(id);
    return PlayerDto.fromEntity(playerEntity);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<PlayerDto> {
    const playerEntity: PlayerEntity = await this.playerRepository.updateOne(id, updatePlayerDto);
    return PlayerDto.fromEntity(playerEntity);
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.playerRepository.softDelete(id);
    if (result.affected === 0) throw new NotFoundException('Player not found');
    return { message: `Given player with id: ${id} has been deleted` };
  }
}
