import { inject, injectable } from 'tsyringe';
import { Photo } from '@modules/photos/infra/typeorm/entities/Photo';
import { IPhotosRepository } from '@modules/photos/repositories/IPhotosRepository';
import { CreatePhotoDTO } from '@modules/photos/dtos/CreatePhotoDTO';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProviders';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UploadPhotoService {
    constructor(
        @inject('PhotosRepository')
        private photosRepository: IPhotosRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ name, productId }: CreatePhotoDTO): Promise<Photo> {
        if (!name) {
            throw new AppError('name not found');
        }

        await this.storageProvider.saveFile(name);

        const photo = await this.photosRepository.create({
            name,
            productId,
        });

        return photo;
    }
}
