import { inject, injectable } from 'tsyringe';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { CreateShopDTO } from '@modules/shop/dtos/CreateShopDTO';

@injectable()
export class CreateShopService {
    constructor(
        @inject('ShopRepository')
        private shopRepository: IShopRepository,
    ) {}

    public async execute({
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: CreateShopDTO): Promise<Shop> {
        const shop = await this.shopRepository.create({
            clientId,
            productId,
            typeOfPayment,
            userId,
        });

        return shop;
    }
}
