import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class GetProductByIdService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(productId: string): Promise<Product | undefined> {
        const products = await this.productsRepository.findById(productId);

        return products;
    }
}
