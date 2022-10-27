import { inject, injectable } from 'tsyringe';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeleteShopService {
    constructor(
        @inject('ShopRepository')
        private shopRepository: IShopRepository,
    ) {}

    async execute(userId: string): Promise<void> {
        const shop = await this.shopRepository.findByUserId(userId);

        if (!shop) {
            throw new AppError('Compra não encontrada');
        }

        await this.shopRepository.delete(userId);
    }
}
