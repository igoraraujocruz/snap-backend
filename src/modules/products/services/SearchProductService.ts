import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class SearchProductService extends BaseService<Product> {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {
        super(productsRepository);
    }

    public async execute(option: string): Promise<Product[]> {
        const products = await this.productsRepository.findByNamePricePoints(
            option,
        );

        return products;
    }
}
