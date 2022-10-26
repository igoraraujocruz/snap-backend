import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProviders';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    async execute(id: string): Promise<void> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('product not found');
        }

        product.photos.forEach(async photo => {
            await this.storageProvider.deleteFile(photo.name);
        });

        await this.productsRepository.delete(id);
    }
}
