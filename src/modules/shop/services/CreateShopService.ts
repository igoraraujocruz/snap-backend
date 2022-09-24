import { inject, injectable } from 'tsyringe';
import { Shop } from '@modules/shop/infra/typeorm/entities/Shop';
import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { CreateShopDTO } from '@modules/shop/dtos/CreateShopDTO';
import { AppError } from '@shared/errors/AppError';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

@injectable()
export class CreateShopService {
    constructor(
        @inject('ShopRepository')
        private shopRepository: IShopRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({
        quantity,
        clientId,
        productId,
        typeOfPayment,
        userId,
    }: CreateShopDTO): Promise<Shop> {
        const product = await this.productsRepository.findById(productId)

            if (!product) {
                throw new AppError('Produto não encontrado')
            }


        if(typeOfPayment == 'creditPoints') {
            /* const shops = await this.shopRepository.findByClientId({clientId})

            const clientPoints =  shops.filter(shop => shop.typeOfPayment !== 'creditPoints')
            .map(shop => shop.quantity * shop.product.creditPoints)
            .reduce((prev, curr) => prev + curr, 0) */

            
            const client = await this.clientsRepository.findById(clientId)

            if (!client) {
                throw new AppError('Cliente não encontrado')
            }

            const clientPoints = client.points;

            const productPoints = product.debitPoints;
            
             if (clientPoints < quantity * productPoints) {
                throw new AppError('Infelizmente, você não possui a quantidade de pontos suficiente')
            }

            await this.clientsRepository.decreasePoints({
                points: quantity * product.debitPoints,
                id: clientId
            })

            const shop = await this.shopRepository.create({
                quantity,
                clientId,
                productId,
                typeOfPayment,
                userId,
            });

            return shop;
        }

        await this.clientsRepository.addPoints({
            points: quantity * product.creditPoints,
            id: clientId
        })

        const shop = await this.shopRepository.create({
            quantity,
            clientId,
            productId,
            typeOfPayment,
            userId,
        });

        return shop;
    }
}
