import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { CreateShopDTO } from '../dtos/CreateShopDTO';
import { GetShopDTO } from '../dtos/GetShopDTO';

export interface IShopRepository {
    create({
        quantity,
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: CreateShopDTO): Promise<Shop>;

    findByClientId({ clientId }: GetShopDTO): Promise<Shop[]>;

    findByProductId({ productId }: GetShopDTO): Promise<Shop[]>;

    findByUserId({ userId }: GetShopDTO): Promise<Shop[]>;

    findByTypeOfPayment({ typeOfPayment }: GetShopDTO): Promise<Shop[]>;

    findAll(): Promise<Shop[]>;
}
