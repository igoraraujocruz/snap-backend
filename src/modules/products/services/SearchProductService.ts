import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class SearchProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(option: string): Promise<Product[]> {
        const products = await this.productsRepository.findAllByName(
            option,
        );

        return products;
    }
}
