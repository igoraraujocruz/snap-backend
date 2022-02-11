import { Order } from '@modules/orders/infra/typeorm/entities/Order';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export type IOrdersRepository = IBaseRepository<Order>;
