import { Photo } from '@modules/photos/infra/typeorm/entities/Photo';
import { CreatePhotoDTO } from '../dtos/CreatePhotoDTO';

export interface IPhotosRepository {
    findById(photoId: string): Promise<Photo | undefined>;
    delete(photoId: string): Promise<void>;
    create({ name, productId }: CreatePhotoDTO): Promise<Photo>;
}
