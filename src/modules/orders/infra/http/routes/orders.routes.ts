import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { OrdersController } from '@modules/orders/infra/http/controllers/OrdersController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string(),
            contact: Joi.string()
                .length(11)
                .pattern(/^[0-9]+$/)
                .required(),
            client: Joi.string().required(),
        },
    }),
    ordersController.create,
);

ordersRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.remove,
);

ordersRouter.put(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string(),
            contact: Joi.string().required(),
            client: Joi.string().required(),
        },
    }),
    ordersController.update,
);

ordersRouter.get(
    '/:id?',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
        [Segments.QUERY]: {
            option: Joi.string(),
        },
    }),
    ordersController.get,
);
