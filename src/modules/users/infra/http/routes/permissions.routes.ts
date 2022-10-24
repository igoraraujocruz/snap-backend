import { Router } from 'express';

import { PermissionsController } from '@modules/users/infra/http/controllers/PermissionsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.get('/', ensureAuthenticated, permissionsController.list);
