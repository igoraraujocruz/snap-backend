import { Router } from 'express';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { clientsRouter } from '@modules/clients/infra/http/routes/clients.routes';
import { productsRouter } from '@modules/products/infra/http/routes/products.routes';
import { photosRouter } from '@modules/photos/infra/http/routes/photos.routes';
import { passwordsProvidersRouter } from '@modules/users/infra/http/routes/passwords.routes';

export const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/products', productsRouter);
routes.use('/photos', photosRouter);
routes.use('/password', passwordsProvidersRouter);
