import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ProductsController } from '@modules/products/infra/http/controllers/ProductsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { can } from '../../../../users/infra/http/middlewares/permissions';

export const productsRouter = Router();
const productsController = new ProductsController();
const upload = multer(uploadConfig.multer);

productsRouter.post(
    '/',
    ensureAuthenticated,
    can(['Cadastrar Produto']),
    upload.array('photos'),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            creditPoints: Joi.number().required(),
             debitPoints: Joi.number().required(),
             description: Joi.string().required(),
        },
    }),
    productsController.create,
);

productsRouter.delete(
    '/:id',
    ensureAuthenticated,
    can(['Deletar Produto']),
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.remove,
);

productsRouter.put(
    '/',
    ensureAuthenticated,
    can(['Editar Produto']),
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().uuid().required(),
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number(),
            creditPoints: Joi.number(),
            debitPoints: Joi.number(),
        },
    }),
    productsController.update,
);

productsRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: {
            productSlug: Joi.string(),
            productId: Joi.string().uuid(),
        },
    }),
    productsController.get,
);

productsRouter.get(
    '/search/:option?',
    celebrate({
        [Segments.PARAMS]: {
            option: Joi.string(),
        },
    }),
    productsController.search,
);
