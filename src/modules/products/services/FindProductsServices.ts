import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class FindProductsServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(option: string): Promise<Product[] | undefined> {
        const products = await this.productsRepository.findAllByName(option);

        return products;
    }
}
