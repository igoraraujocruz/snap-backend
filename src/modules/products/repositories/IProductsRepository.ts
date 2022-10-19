import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { CreateProductDTO } from '../dtos/CreateProductDTO';

export interface IProductsRepository {
    findByName(name: string): Promise<Product | undefined>;
    findById(productId: string): Promise<Product | undefined>;
    findAll(page?: number, perPage?: number): Promise<Product[]>;
    findBySlug(slug: string): Promise<Product | undefined>;
    findByNamePricePoints(option: string): Promise<Product[]>;
    create(product: CreateProductDTO): Promise<Product>;
    findAllByName(name: string): Promise<Product[]>;
    delete(id: string): Promise<void>;
    save(product: Product): Promise<Product>;
}
