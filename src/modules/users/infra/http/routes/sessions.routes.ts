import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { SessionsController } from '@modules/users/infra/http/controllers/SessionsController';

export const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.handle,
);
