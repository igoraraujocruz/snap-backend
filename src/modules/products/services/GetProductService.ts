import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class GetProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<Product[]> {
        const products = await this.productsRepository.findAll();

        return products;
    }
}
