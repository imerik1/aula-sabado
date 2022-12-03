import { Injectable } from '@nestjs/common';
import { Secondary } from '@prisma/client';
import { Repository } from 'src/repository/repository';

@Injectable()
export class SecondaryService {
  constructor(private repository: Repository) {}

  async getAll() {
    return await this.repository.secondary.findMany();
  }

  async get(id: number) {
    return await this.repository.secondary.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async save(data: Secondary) {
    return await this.repository.secondary.create({
      data,
    });
  }

  async update(id: number, data: Secondary) {
    return await this.repository.secondary.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return await this.repository.secondary.delete({
      where: {
        id,
      },
    });
  }
}
