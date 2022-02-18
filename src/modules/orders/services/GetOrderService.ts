import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class GetOrderService extends BaseService<Order> {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {
        super(ordersRepository);
    }

    public async execute(
        id?: string,
        option?: string,
    ): Promise<Order | Order[]> {
        if (id) {
            const order = await this.ordersRepository.findById(id);

            if (!order) {
                throw new AppError('Order not found');
            }

            return order;
        }

        if (option) {
            const order = await this.ordersRepository.filterOrders(option);

            if (!order) {
                throw new AppError('Order not found');
            }

            return order;
        }

        const orders = await this.ordersRepository.findAll();

        return orders;
    }
}
