import { inject, injectable } from 'tsyringe';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { CreateOrderDTO } from '@modules/orders/dtos/CreateOrderDTO';

@injectable()
export class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute({
        name,
        description,
        contact,
        requesterId,
        client,
    }: CreateOrderDTO): Promise<Order> {
        const order = await this.ordersRepository.create({
            name,
            description,
            contact,
            requesterId,
            client,
        });

        return order;
    }
}
