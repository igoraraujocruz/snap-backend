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

    public async findBySlug(slug: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne({
            where: { slug },
        });

        return product;
    }

    public async findByNamePricePoints(option: string): Promise<Product[]> {
        const products = this.ormRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.photos', 'photos')
            .where('LOWER(product.name) = LOWER(:option)', { option })
            .orWhere('product.price = :option', { option })
            .orWhere('product.debitPoints = :option', { option })
            .getMany();

        return products;
    }
}