import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ShopController } from '@modules/shop/infra/http/controllers/ShopController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const shopRouter = Router();
const shopController = new ShopController();

shopRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            quantity: Joi.number().required(),
            clientId: Joi.string().required(),
            productId: Joi.string().required(),
            typeOfPayment: Joi.string()
                .required()
                .valid(
                    'money',
                    'debitPoints',
                    'creditCard',
                    'debitCard',
                    'pix',
                    'picpay',
                    'creditPoints'
                ),
        },
    }),
    shopController.create,
);

shopRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    shopController.remove,
);

shopRouter.get(
    '/:clientId?',
    celebrate({
        [Segments.PARAMS]: {
            clientId: Joi.string().uuid(),
        },
    }),
    shopController.get,
);
