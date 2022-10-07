import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { UsersPermissionsController } from '@modules/usersPermissions/infra/http/controllers/UsersPermissionsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const usersPermissionsRouter = Router();
const usersPermissionController = new UsersPermissionsController();

usersPermissionsRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            userId: Joi.string().uuid().required(),
            permissionId: Joi.array().required(),
        },
    }),
    usersPermissionController.create,
);

/* usersPermissionsRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providersAgreementsController.remove,
); */