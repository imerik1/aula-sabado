import { Module } from '@nestjs/common';
import { PrimaryModule } from './primary/primary.module';
import { SecondaryModule } from './secondary/secondary.module';

@Module({
  imports: [PrimaryModule, SecondaryModule],
})
export class AppModule {}
