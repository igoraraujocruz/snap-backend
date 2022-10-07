import { inject, injectable } from 'tsyringe';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { UpdateProductDTO } from '@modules/products/dtos/UpdateProductDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        id,
        name,
        description,
        creditPoints,
        debitPoints,
        price,
        userId,
    }: UpdateProductDTO): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found');
        }

        const productNameAlreadyExist =
            await this.productsRepository.findByName(name);

        if(id !== productNameAlreadyExist?.id && name === productNameAlreadyExist?.name) {
            throw new AppError('O nome do produto já está em uso');
        }

        product.name = name;
        product.description = description;
        product.creditPoints = creditPoints;
        product.debitPoints = debitPoints;
        product.price = price;
        product.userId = userId;

        return this.productsRepository.save(product);
    }
}
