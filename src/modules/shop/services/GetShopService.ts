import { inject, injectable } from 'tsyringe';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';

@injectable()
export class GetShopService {
    constructor(
        @inject('ShopRepository')
        private shopRepository: IShopRepository,
    ) {}

    public async execute(
        clientId: string): Promise<Shop[]> {
        if (clientId) {
            const client = await this.shopRepository.findByClientId(clientId);
            return client;
        }

        const shops = await this.shopRepository.findAll();

        return shops;
    }
}
