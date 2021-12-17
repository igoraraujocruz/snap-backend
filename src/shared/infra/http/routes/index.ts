import { Router } from 'express';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';

export const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
