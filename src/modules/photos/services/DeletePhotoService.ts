import { inject, injectable } from 'tsyringe';
import { IPhotosRepository } from '@modules/photos/repositories/IPhotosRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProviders';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeletePhotoService {
    constructor(
        @inject('PhotosRepository')
        private photosRepository: IPhotosRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute(id: string): Promise<void> {
        const photo = await this.photosRepository.findById(id);

        if (!photo) {
            throw new AppError('photo not found');
        }

        await this.photosRepository.delete(photo.id);

        await this.storageProvider.deleteFile(photo.name);
    }
}
