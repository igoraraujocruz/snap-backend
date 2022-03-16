import { inject, injectable } from 'tsyringe';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { CreateProductDTO } from '@modules/products/dtos/CreateProductDTO';
import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProviders';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        name,
        points,
        userId,
        images,
    }: CreateProductDTO): Promise<Product> {
        const nameAlreadyExist = await this.productsRepository.findByName(name);

        if (nameAlreadyExist) {
            throw new AppError('This name already exist');
        }

        const product = await this.productsRepository.create({
            name,
            points,
            userId,
            images,
        });

        return product;
    }
}
