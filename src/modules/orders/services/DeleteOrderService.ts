import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';

@injectable()
export class DeleteOrderService extends BaseService<Order> {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {
        super(ordersRepository);
    }
}
