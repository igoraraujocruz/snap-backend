import { getRepository, Repository } from 'typeorm';
import { IPhotosRepository } from '@modules/photos/repositories/IPhotosRepository';
import { Photo } from '@modules/photos/infra/typeorm/entities/Photo';
import { CreatePhotoDTO } from '@modules/photos/dtos/CreatePhotoDTO';

export class PhotosRepository implements IPhotosRepository {
    private ormRepository: Repository<Photo>;

    constructor() {
        this.ormRepository = getRepository(Photo);
    }

    async create({ name, productId }: CreatePhotoDTO): Promise<Photo> {
        const photo = this.ormRepository.create({ name, productId });

        await this.ormRepository.save(photo);

        return photo;
    }

    async findById(id: string): Promise<Photo | undefined> {
        const item = await this.ormRepository.findOne({
            where: { id },
        });

        return item;
    }

    async delete(photoId: string): Promise<void> {
        await this.ormRepository.delete(photoId);
    }
}
