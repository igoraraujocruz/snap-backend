import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class GetProductBySlugService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(productSlug: string): Promise<Product | undefined> {
        const products = await this.productsRepository.findBySlug(productSlug);

        return products;
    }
}
