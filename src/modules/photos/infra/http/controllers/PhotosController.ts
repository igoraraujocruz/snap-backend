import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadPhotoService } from '@modules/photos/services/UploadPhotoService';
import { DeletePhotoService } from '@modules/photos/services/DeletePhotoService';

export class PhotosController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { productId } = request.params;

        const uploadPhotos = container.resolve(UploadPhotoService);

        request.files.forEach(nome => {
            uploadPhotos.execute({
                name: nome.filename,
                productId,
            });
        });

        return response.status(200).json({ message: 'Upload image success' });
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const removePhoto = container.resolve(DeletePhotoService);

        const photoRemoved = await removePhoto.execute(id);

        return response.status(200).json(photoRemoved);
    }
}
