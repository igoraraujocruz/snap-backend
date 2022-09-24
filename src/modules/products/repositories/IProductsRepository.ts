import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { CreateProductDTO } from '../dtos/CreateProductDTO';

export interface IProductsRepository {
    findByName(name: string): Promise<Product | undefined>;
    findById(productId: string): Promise<Product | undefined>;
    findAll(): Promise<Product[]>;
    findBySlug(slug: string): Promise<Product | undefined>;
    findByNamePricePoints(option: string): Promise<Product[]>;
    create(product: CreateProductDTO): Promise<Product>;
}
