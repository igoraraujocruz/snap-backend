import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateOrderService } from '@modules/orders/services/CreateOrderService';
import { DeleteOrderService } from '@modules/orders/services/DeleteOrderService';
import { UpdateOrderService } from '@modules/orders/services/UpdateOrderService';
import { GetOrderService } from '@modules/orders/services/GetOrderService';
import { classToClass } from 'class-transformer';

export class OrdersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, description, contact, client } = request.body;

        const createOrder = container.resolve(CreateOrderService);

        const order = await createOrder.execute({
            name,
            description,
            contact,
            requesterId: request.user.id,
            client,
        });

        return response.status(200).json(classToClass(order));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const deleteOrder = container.resolve(DeleteOrderService);

            const orderDeleted = await deleteOrder.delete(id);

            return response.json(classToClass(orderDeleted));
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, description, contact, client } = request.body;

        const updateOrder = container.resolve(UpdateOrderService);

        const orderUpdated = await updateOrder.update({
            id,
            name,
            description,
            contact,
            requesterId: request.user.id,
            client,
        });

        return response.json(classToClass(orderUpdated));
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const findOrder = container.resolve(GetOrderService);

        const order = await findOrder.execute(id);

        return response.json(classToClass(order));
    }
}
