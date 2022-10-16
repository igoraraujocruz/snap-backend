import { getRepository, Repository } from 'typeorm';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { CreateShopDTO } from '@modules/shop/dtos/CreateShopDTO';

export class ShopRepository implements IShopRepository {
    private ormRepository: Repository<Shop>;

    constructor() {
        this.ormRepository = getRepository(Shop);
    }

    async create({
        quantity,
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: CreateShopDTO): Promise<Shop> {
        const shopCreated = this.ormRepository.create({
            quantity,
            clientId,
            productId,
            typeOfPayment,
            userId,
        });

        await this.ormRepository.save(shopCreated);

        return shopCreated;
    }

    async findByTypeOfPayment(typeOfPayment: string): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { typeOfPayment },
        });

        return shop;
    }

    async findByClientId(clientId: string): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { clientId },
        });

        return shop;
    }

    async findByProductId(productId: string): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { productId },
        });

        return shop;
    }

    async findByUserId(userId: string): Promise<Shop[]> {
        const shop = this.ormRepository.find({
            where: { userId },
        });

        return shop;
    }

    async findAll(): Promise<Shop[]> {
        return this.ormRepository.find();
    }
}
