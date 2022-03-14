import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ClientsController } from '@modules/clients/infra/http/controllers/ClientsController';

export const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string()
                .required()
                .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
            email: Joi.string().email().required(),
            birthday: Joi.date().required(),
            mobilePhone: Joi.string().max(13).required(),
        },
    }),
    clientsController.create,
);

clientsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    clientsController.remove,
);

clientsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string(),
            cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
            email: Joi.string().email(),
            birthday: Joi.date(),
            mobilePhone: Joi.string().max(13),
        },
    }),
    clientsController.update,
);

clientsRouter.get(
    '/:id?',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    clientsController.get,
);
