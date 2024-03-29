import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateShopService } from '@modules/shop/services/CreateShopService';
import { DeleteShopService } from '@modules/shop/services/DeleteShopService';
import { GetShopService } from '@modules/shop/services/GetShopService';
import { classToClass } from 'class-transformer';

export class ShopController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { typeOfPayment, clientId, productId, quantity } = request.body;

        const createShop = container.resolve(CreateShopService);

        const shop = await createShop.execute({
            quantity,
            clientId,
            productId,
            typeOfPayment,
            userId: request.user.id,
        });

        return response.status(200).json(classToClass(shop));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const deleteShop = container.resolve(DeleteShopService);

            const shopDeleted = await deleteShop.delete(id);

            return response.json(classToClass(shopDeleted));
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { clientId } = request.params

        const find = container.resolve(GetShopService);

        const shop = await find.execute(clientId);

        return response.json(classToClass(shop));
    }
}
