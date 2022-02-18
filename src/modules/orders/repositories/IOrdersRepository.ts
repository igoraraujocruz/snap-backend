import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface IOrdersRepository extends IBaseRepository<Order> {
    filterOrders(option: string): Promise<Order[]>;
}
