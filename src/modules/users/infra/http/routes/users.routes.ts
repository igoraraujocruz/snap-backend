import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { UsersController } from '@modules/users/infra/http/controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { can } from '../middlewares/permissions';

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
    '/',
    ensureAuthenticated,
    can(['Cadastrar Usuario']),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            mobilePhone: Joi.string().max(11).min(11).required(),
            permissions: Joi.array().required(),
        },
    }),
    usersController.create,
);

usersRouter.delete(
    '/:id',
    ensureAuthenticated,
    can(['Deletar Usuario']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.remove,
);

usersRouter.put(
    '/:id',
    ensureAuthenticated,
    can(['Editar Usuario']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            mobilePhone: Joi.string().max(13).required(),
        },
    }),
    usersController.update,
);

usersRouter.patch(
    '/:id',
    ensureAuthenticated,
    can(['Editar Usuario']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            permissions: Joi.array().required(),
        },
    }),
    usersController.updatePermissions,
);

usersRouter.get(
    '/:id?',
    ensureAuthenticated,
    can(['Listar Usuario']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        }
    }),
    usersController.getUsers,
);

usersRouter.get(
    '/get/me',
    ensureAuthenticated,
    usersController.getMyUser,
);

usersRouter.get(
    '/search/:option?',
    ensureAuthenticated,
    can(['Listar Usuario']),
    celebrate({
        [Segments.PARAMS]: {
            option: Joi.string(),
        },
    }),
    usersController.search,
);
