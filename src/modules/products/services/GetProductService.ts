import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class GetProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(page?: number, perPage?: number): Promise<Product[]> {
        const products = await this.productsRepository.findAll(page, perPage);

        return products;
    }
}
