import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { UsersController } from '@modules/users/infra/http/controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            mobilePhone: Joi.string().max(11).min(11).required(),
        },
    }),
    usersController.create,
);

usersRouter.delete(
    '/:id',
    ensureAuthenticated,
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

usersRouter.get(
    '/:id?',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    usersController.get,
);

usersRouter.get(
    '/search/:option?',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            option: Joi.string(),
        },
    }),
    usersController.search,
);
