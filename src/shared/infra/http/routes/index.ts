import { Router } from 'express';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { clientsRouter } from '@modules/clients/infra/http/routes/clients.routes';
import { productsRouter } from '@modules/products/infra/http/routes/products.routes';
import { photosRouter } from '@modules/photos/infra/http/routes/photos.routes';
import { passwordsProvidersRouter } from '@modules/users/infra/http/routes/passwords.routes';
import { permissionsRouter } from '@modules/users/infra/http/routes/permissions.routes';
import { shopRouter } from '@modules/shop/infra/http/routes/shop.routes';

export const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/products', productsRouter);
routes.use('/photos', photosRouter);
routes.use('/password', passwordsProvidersRouter);
routes.use('/permissions', permissionsRouter);
routes.use('/shop', shopRouter);
