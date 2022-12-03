import { Module } from '@nestjs/common';
import { Repository } from 'src/repository/repository';
import { PrimaryController } from './primary.controller';
import { PrimaryService } from './primary.service';

@Module({
  controllers: [PrimaryController],
  providers: [PrimaryService, Repository],
})
export class PrimaryModule {}
