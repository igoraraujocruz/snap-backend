import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class GetProductService extends BaseService<Product> {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {
        super(productsRepository);
    }

    public async execute(slug?: string): Promise<Product | Product[]> {
        if (slug) {
            const product = await this.productsRepository.findBySlug(slug);

            if (!product) {
                throw new AppError('Product not found');
            }

            return product;
        }

        const products = await this.productsRepository.findAll();

        return products;
    }
}
