import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsAndQuantityOfProducts } from '@modules/clients/dtos/ProductsAndQuantityOfProducts';

@injectable()
export class GetProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(page?: number, perPage?: number): Promise<ProductsAndQuantityOfProducts> {

        const products = await this.productsRepository.findAll(page, perPage);

        return products;
    }
}
