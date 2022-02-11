import { getRepository, Repository } from 'typeorm';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import { Order } from '@modules/orders/infra/typeorm/entities/Order';

export class OrdersRepository
    extends BaseRepository<Order>
    implements IOrdersRepository
{
    readonly ormRepository: Repository<Order>;

    constructor() {
        const repo = getRepository(Order);
        super(repo);
        this.ormRepository = repo;
    }
}
