import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ProductsController } from '@modules/products/infra/http/controllers/ProductsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

export const productsRouter = Router();
const productsController = new ProductsController();
const upload = multer(uploadConfig.multer);

productsRouter.post(
    '/',
    ensureAuthenticated,
    upload.single('images'),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            points: Joi.number().required(),
        },
    }),
    productsController.create,
);

productsRouter.patch(
    '/image/:id',
    ensureAuthenticated,
    upload.single('image'),
    productsController.updateImage,
);

productsRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.remove,
);

productsRouter.put(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string(),
            images: Joi.string(),
            points: Joi.string(),
        },
    }),
    productsController.update,
);

productsRouter.get(
    '/:id?',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    productsController.get,
);
