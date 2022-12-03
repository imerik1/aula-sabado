import { Injectable } from '@nestjs/common';
import { Primary } from '@prisma/client';
import { Repository } from 'src/repository/repository';

@Injectable()
export class PrimaryService {
  constructor(private repository: Repository) {}

  async getAll() {
    return await this.repository.primary.findMany({
      include: {
        secondaries: true,
      },
    });
  }

  async get(id: number) {
    return await this.repository.primary.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        secondaries: true,
      },
    });
  }

  async save(data: Primary) {
    return await this.repository.primary.create({
      data,
      include: {
        secondaries: true,
      },
    });
  }

  async update(id: number, data: Primary) {
    return await this.repository.primary.update({
      data,
      where: {
        id,
      },
      include: {
        secondaries: true,
      },
    });
  }

  async delete(id: number) {
    return await this.repository.primary.delete({
      where: {
        id,
      },
    });
  }
}
