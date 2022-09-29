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
    upload.array('photos'),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            creditPoints: Joi.number().required(),
             debitPoints: Joi.number().required(),
             description: Joi.string().required(),
        },
    }),
    productsController.create,
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
    '/',
    celebrate({
        [Segments.QUERY]: {
            productSlug: Joi.string(),
            productId: Joi.string().uuid(),
        },
    }),
    productsController.get,
);

productsRouter.get(
    '/search/:option?',
    celebrate({
        [Segments.PARAMS]: {
            option: Joi.string(),
        },
    }),
    productsController.search,
);
