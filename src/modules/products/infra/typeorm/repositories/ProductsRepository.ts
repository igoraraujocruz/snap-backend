import { getRepository, Repository } from 'typeorm';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import { Product } from '@modules/products/infra/typeorm/entities/Product';

export class ProductsRepository
    extends BaseRepository<Product>
    implements IProductsRepository
{
    readonly ormRepository: Repository<Product>;

    constructor() {
        const repo = getRepository(Product);
        super(repo);
        this.ormRepository = repo;
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const item = this.ormRepository.findOne({
            where: { name },
        });

        return item;
    }
}
