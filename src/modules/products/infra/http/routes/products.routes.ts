import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ProductsController } from '@modules/products/infra/http/controllers/ProductsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            images: Joi.string().required(),
            points: Joi.number().required(),
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
    '/:id?',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    productsController.get,
);
