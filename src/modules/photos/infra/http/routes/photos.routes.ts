import multer from 'multer';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import { PhotosController } from '@modules/photos/infra/http/controllers/PhotosController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

export const photosRouter = Router();
const photosController = new PhotosController();
const upload = multer(uploadConfig.multer);

photosRouter.post(
    '/:productId',
    ensureAuthenticated,
    upload.array('photos'),
    photosController.create,
);

photosRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    photosController.remove,
);
