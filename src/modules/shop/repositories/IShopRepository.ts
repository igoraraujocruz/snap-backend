import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { CreateShopDTO } from '../dtos/CreateShopDTO';

export interface IShopRepository {
    create({
        quantity,
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: CreateShopDTO): Promise<Shop>;

    findByClientId(clientId: string): Promise<Shop[]>;

    findByProductId(productId: string): Promise<Shop[]>;

    findByUserId(userId: string): Promise<Shop[]>;

    findByTypeOfPayment(typeOfPayment: string): Promise<Shop[]>;

    findAll(): Promise<Shop[]>;
}
