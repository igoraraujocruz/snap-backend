import { AppError } from '@shared/errors/AppError';

import { ObjectLiteral } from 'typeorm';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

import { IBaseService } from './interfaces/IBaseServices';

interface IEntity {
    id: string;
}
interface IStandardProps extends IEntity, ObjectLiteral {}

export abstract class BaseService<Entity extends IStandardProps>
    implements IBaseService<Entity>
{
    constructor(private ormRepository: IBaseRepository<Entity>) {}

    readonly serviceName = this.constructor.name.toLowerCase();

    async create(item: Partial<Entity>): Promise<Entity> {
        const items = await this.ormRepository.create(item);

        return items;
    }

    async findAll(): Promise<Entity[]> {
        const entity = await this.ormRepository.findAll();

        return entity;
    }

    async update(item_request: Partial<Entity>): Promise<Entity> {
        const item = await this.ormRepository.update(item_request);

        if (!item) {
          throw new AppError('Item not found.');
        }

        return item;
    }

    async delete(item_id: string): Promise<void> {
        const item = await this.ormRepository.findById(item_id);

        if (!item) {
          throw new AppError('Item not found.');
        }

        await this.ormRepository.delete(item);
    }

    public async findById(item_id: string): Promise<Entity> {
        const item_to_list = await this.ormRepository.findById(item_id);

        if (!item_to_list) {
          throw new AppError('Item not found.');
        }

        return item_to_list;
    }
}
