import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ClientsController } from '@modules/clients/infra/http/controllers/ClientsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { can } from '../../../../users/infra/http/middlewares/permissions';

export const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            neighborhood: Joi.string().required(),
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
    clientsController.delete,
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
            neighborhood: Joi.string(),
            email: Joi.string().email(),
            birthday: Joi.date(),
            mobilePhone: Joi.string().max(13),
        },
    }),
    clientsController.update,
);

clientsRouter.get(
    '/',
    ensureAuthenticated,
    can(['Listar Cliente']),
    celebrate({
        [Segments.QUERY]: {
            clientId: Joi.string().uuid(),
            option: Joi.string(),
            page: Joi.number(),
            clientsPerPage: Joi.number(),
        },
    }),
    clientsController.get,
);
