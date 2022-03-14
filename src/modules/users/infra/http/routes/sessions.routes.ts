import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { SessionsController } from '@modules/users/infra/http/controllers/SessionsController';
import { RefreshTokenController } from '@modules/users/infra/http/controllers/RefreshTokenController';

export const sessionsRouter = Router();
const sessionsController = new SessionsController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.handle,
);

sessionsRouter.post('/refresh-token', refreshTokenController.handle);
