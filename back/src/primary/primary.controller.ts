import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Primary } from '@prisma/client';
import { PrimaryService } from './primary.service';

@Controller('primary')
export class PrimaryController {
  constructor(private service: PrimaryService) {}

  @Get('')
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.service.get(id);
  }

  @Post('')
  async save(@Body() primary: Primary) {
    return await this.service.save(primary);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() primary: Primary,
  ) {
    return await this.service.update(id, primary);
  }
}
