import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { UpdateProductDTO } from '@modules/products/dtos/UpdateProductDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateProductService extends BaseService<Product> {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {
        super(productsRepository);
    }

    public async execute({
        id,
        name,
        images,
        points,
        userId,
    }: UpdateProductDTO): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        const productNameAlreadyExist =
            await this.productsRepository.findByName(name);

        if (productNameAlreadyExist) {
            throw new AppError('Product name is already in use');
        }

        product.name = name;
        product.images = images;

        product.points = points;
        product.userId = userId;

        return this.productsRepository.save(product);
    }
}
