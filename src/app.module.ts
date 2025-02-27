import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { TYPEORM_OPTIONS } from '../ormconfig';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(TYPEORM_OPTIONS), PlayerModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
