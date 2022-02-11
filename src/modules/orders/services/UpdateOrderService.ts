import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { UpdateOrderDTO } from '@modules/orders/dtos/UpdateOrderDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateOrderService extends BaseService<Order> {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {
        super(ordersRepository);
    }

    public async execute({
        id,
        name,
        description,
        contact,
        requesterId,
        client,
    }: UpdateOrderDTO): Promise<Order> {
        const order = await this.ordersRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found');
        }

        order.name = name;
        order.description = description;
        order.contact = contact;
        order.requesterId = requesterId;
        order.client = client;

        return this.ordersRepository.save(order);
    }
}
