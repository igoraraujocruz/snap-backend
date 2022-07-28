import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface IProductsRepository extends IBaseRepository<Product> {
    findByName(name: string): Promise<Product | undefined>;
    findBySlug(slug: string): Promise<Product | undefined>;
    findByNamePricePoints(option: string): Promise<Product[]>;
}
