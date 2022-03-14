import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

@injectable()
export class DeleteProductService extends BaseService<Product> {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {
        super(productsRepository);
    }
}
