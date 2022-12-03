import { Module } from '@nestjs/common';
import { Repository } from 'src/repository/repository';
import { SecondaryController } from './secondary.controller';
import { SecondaryService } from './secondary.service';

@Module({
  controllers: [SecondaryController],
  providers: [SecondaryService, Repository],
})
export class SecondaryModule {}
