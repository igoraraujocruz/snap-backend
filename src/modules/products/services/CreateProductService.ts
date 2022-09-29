import { inject, injectable } from 'tsyringe';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { CreateProductDTO } from '@modules/products/dtos/CreateProductDTO';
import { AppError } from '@shared/errors/AppError';
import slugify from 'slugify';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        name,
        slug,
        price,
        description,
        creditPoints,
        debitPoints,
        userId,
    }: CreateProductDTO): Promise<Product> {
        
        const slugAlreadyExist = await this.productsRepository.findBySlug(slug);

        if (slugAlreadyExist) {
            const product = await this.productsRepository.create({
                name,
                slug: slugify(`${name}-${creditPoints}`, {
                    lower: true,
                }),
                price,
                description,
                creditPoints,
                debitPoints,
                userId,
            });

            return product;
        }

        const product = await this.productsRepository.create({
            name,
            slug,
            price,
            description,
            creditPoints,
            debitPoints,
            userId,
        });

        return product;
    }
}
