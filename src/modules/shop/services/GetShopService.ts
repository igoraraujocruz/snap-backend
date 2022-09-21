import { inject, injectable } from 'tsyringe';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { GetShopDTO } from '../dtos/GetShopDTO';

@injectable()
export class GetShopService {
    constructor(
        @inject('ShopRepository')
        private shopRepository: IShopRepository,
    ) {}

    public async execute({
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: GetShopDTO): Promise<Shop[]> {
        if (clientId) {
            const client = await this.shopRepository.findByClientId({
                clientId,
            });
            return client;
        }

        if (productId) {
            const product = await this.shopRepository.findByProductId({
                productId,
            });

            return product;
        }

        if (typeOfPayment) {
            const type = await this.shopRepository.findByTypeOfPayment({
                typeOfPayment,
            });

            return type;
        }

        if (userId) {
            const user = await this.shopRepository.findByUserId({ userId });
            return user;
        }

        const shops = await this.shopRepository.findAll();

        return shops;
    }
}
