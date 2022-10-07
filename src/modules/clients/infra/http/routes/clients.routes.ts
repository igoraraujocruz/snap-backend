import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ClientsController } from '@modules/clients/infra/http/controllers/ClientsController';
import { can } from '../../../../users/infra/http/middlewares/permissions';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string().required().max(11).min(11),
            email: Joi.string().email().required(),
            birthday: Joi.date().required(),
            mobilePhone: Joi.string().max(11).min(11).required(),
        },
    }),
    clientsController.create,
);

clientsRouter.delete(
    '/:id',
    ensureAuthenticated,
    can(['Deletar Cliente']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    clientsController.remove,
);

clientsRouter.put(
    '/:id',
    ensureAuthenticated,
    can(['Editar Cliente']),
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
    ensureAuthenticated,
    can(['Listar Cliente']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    clientsController.get,
);

clientsRouter.get(
    '/search/:option?',
    ensureAuthenticated,
    can(['Listar Cliente']),
    celebrate({
        [Segments.PARAMS]: {
            option: Joi.string(),
        },
    }),
    clientsController.search,
);
