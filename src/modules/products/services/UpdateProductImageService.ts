import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProviders';

import { Product } from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
    productId: string;
    imageFilename: string | undefined;
}

@injectable()
export class UpdateProductImageService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        productId,
        imageFilename,
    }: IRequest): Promise<Product> {
        const product = await this.productsRepository.findById(productId);

        if (!product) {
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );
        }

        if (!imageFilename) {
            throw new AppError('Avatar file name not found');
        }

        if (product.images) {
            await this.storageProvider.deleteFile(product.images);
        }

        const fileName = await this.storageProvider.saveFile(imageFilename);

        product.images = fileName;

        await this.productsRepository.save(product);

        return product;
    }
}
