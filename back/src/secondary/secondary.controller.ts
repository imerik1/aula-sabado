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
import { Secondary } from '@prisma/client';
import { SecondaryService } from './secondary.service';

@Controller('secondary')
export class SecondaryController {
  constructor(private service: SecondaryService) {}

  @Get('')
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.service.get(id);
  }

  @Post('')
  async save(@Body() secondary: Secondary) {
    return await this.service.save(secondary);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() secondary: Secondary,
  ) {
    return await this.service.update(id, secondary);
  }
}
