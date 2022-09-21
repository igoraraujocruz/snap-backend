import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';

@injectable()
export class DeleteShopService extends BaseService<Shop> {
    constructor(
        @inject('ShopRepository')
        private shopRepository: IShopRepository,
    ) {
        super(shopRepository);
    }
}
