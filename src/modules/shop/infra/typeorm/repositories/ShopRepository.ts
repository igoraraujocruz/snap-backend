import { getRepository, Repository } from 'typeorm';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { CreateShopDTO } from '@modules/shop/dtos/CreateShopDTO';
import { GetShopDTO } from '@modules/shop/dtos/GetShopDTO';

export class ShopRepository implements IShopRepository {
    private ormRepository: Repository<Shop>;

    constructor() {
        this.ormRepository = getRepository(Shop);
    }

    async create({
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: CreateShopDTO): Promise<Shop> {
        const shop = this.ormRepository.create({
            clientId,
            productId,
            typeOfPayment,
            userId,
        });

        const shopCreated = await this.ormRepository.save(shop);

        return shopCreated;
    }

    async findByTypeOfPayment({ typeOfPayment }: GetShopDTO): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { typeOfPayment },
        });

        return shop;
    }

    async findByClientId({ clientId }: GetShopDTO): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { clientId },
        });

        return shop;
    }

    async findByProductId({ productId }: GetShopDTO): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { productId },
        });

        return shop;
    }

    async findByUserId({ userId }: GetShopDTO): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { userId },
        });

        return shop;
    }

    async findAll(): Promise<Shop[]> {
        return this.ormRepository.find();
    }
}
