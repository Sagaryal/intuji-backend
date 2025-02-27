import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PlayerEntity } from '../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PlayerRepository extends Repository<PlayerEntity> {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: Repository<PlayerEntity>,
  ) {
    super(playerRepository.target, playerRepository.manager, playerRepository.queryRunner);
  }

  public async store(playerData: Partial<PlayerEntity>): Promise<PlayerEntity> {
    const player = this.playerRepository.create(playerData);

    return this.playerRepository.save(player);
  }

  public async findById(id: string): Promise<PlayerEntity> {
    const player: PlayerEntity = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException('Player not found!');
    }

    return player;
  }

  public async updateOne(id: string, playerData: Partial<PlayerEntity>): Promise<PlayerEntity> {
    const player = await this.findById(id);

    if (!player) {
      throw new NotFoundException('Player not found!');
    }

    await this.playerRepository.update(id, playerData);
    return this.findById(id);
  }

  public async destroy(id: string): Promise<void> {
    await this.playerRepository.delete(id);
  }
}
