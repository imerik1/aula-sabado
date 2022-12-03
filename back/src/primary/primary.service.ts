import { Injectable } from '@nestjs/common';
import { Repository } from 'src/repository/repository';

export interface IPrimary {
  name: string;
  age: number;
}

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

  async save({ name, age }: IPrimary) {
    return await this.repository.primary.create({
      data: {
        name,
        age,
      },
      include: {
        secondaries: true,
      },
    });
  }

  async update(id: number, { name, age }: IPrimary) {
    return await this.repository.primary.update({
      data: {
        name,
        age,
      },
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
