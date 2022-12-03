import { Injectable } from '@nestjs/common';
import { Repository } from 'src/repository/repository';

export interface ISecondary {
  name: string;
  quantity: number;
}

export interface ISecondaryCreate extends ISecondary {
  primaryId: number;
}

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

  async save({ name, quantity, primaryId }: ISecondaryCreate) {
    return await this.repository.secondary.create({
      data: {
        name,
        quantity,
        primaryId,
      },
    });
  }

  async update(id: number, { name, quantity }: ISecondary) {
    return await this.repository.secondary.update({
      data: {
        name,
        quantity,
      },
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
