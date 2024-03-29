import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ForgotPasswordController } from '@modules/users/infra/http/controllers/ForgotPasswordController';
import { ResetPasswordController } from '@modules/users/infra/http/controllers/ResetPasswordController';

export const passwordsProvidersRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordsProvidersRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.create,
);
passwordsProvidersRouter.post(
    '/reset/:token',
    celebrate({
        [Segments.PARAMS]: {
            token: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            password: Joi.string().required().min(5),
            password_confirmation: Joi.string()
                .min(5)
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    resetPasswordController.create,
);
