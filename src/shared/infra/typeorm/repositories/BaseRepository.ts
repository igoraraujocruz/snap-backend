import { Repository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export default abstract class BaseRepository<Entity>
    implements IBaseRepository<Entity>
{
    readonly ormRepository: Repository<Entity>;

    constructor(ormRepository: Repository<Entity>) {
        this.ormRepository = ormRepository;
    }

    async save(item: Entity): Promise<Entity> {
        return this.ormRepository.save(item);
    }

    async create(item: Entity): Promise<Entity> {
        const itemToSave = this.ormRepository.create(item);

        const itemSaved = await this.ormRepository.save(itemToSave);

        return itemSaved;
    }

    async update(item: Entity): Promise<Entity> {
        const preloadedItem = await this.ormRepository.preload(item);

        if (preloadedItem) {
            return this.ormRepository.save(preloadedItem);
        }
        throw new AppError('Entidade inexistente no banco de dados.', 400);
    }

    async delete(item: Entity): Promise<void> {
        await this.ormRepository.softRemove(item);
    }

    async findAll(): Promise<Entity[]> {
        return this.ormRepository.find();
    }

    async findById(id: string): Promise<Entity | undefined> {
        const item = await this.ormRepository.findOne(id);

        return item;
    }
}
