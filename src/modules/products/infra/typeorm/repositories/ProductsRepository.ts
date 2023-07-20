import { getRepository, Repository } from 'typeorm';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { CreateProductDTO } from '@modules/products/dtos/CreateProductDTO';

export class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    async create(product: CreateProductDTO): Promise<Product> {
        const productCreated = this.ormRepository.create(product);

        await this.ormRepository.save(productCreated);

        return productCreated;
    }

    async findAll(page: number, perPage: number): Promise<Product[]> {
        const products = await this.ormRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
            order: {
                createdAt: 'ASC',
            },
        });

        return products;
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const item = this.ormRepository.findOne({
            where: { name },
        });

        return item;
    }

    public async findById(productId: string): Promise<Product | undefined> {
        const item = this.ormRepository.findOne({
            where: { id: productId },
        });

        return item;
    }

    public async findBySlug(slug: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne({
            where: { slug },
        });

        return product;
    }

    public async findAllByName(name: string): Promise<Product[]> {
        const item = this.ormRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.photos', 'photos')
            .leftJoinAndSelect('product.user', 'user')
            .where('LOWER(product.name) = LOWER(:name)', { name })
            .getMany();

        return item;
    }

    public async findByNamePricePoints(option: string): Promise<Product[]> {
        const products = this.ormRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.photos', 'photos')
            .where('LOWER(product.name) = LOWER(:option)', { option })
            .orWhere('product.price = :option', { option })
            .orWhere('product.debitPoints = :option', { option })
            .getMany();

        return products;
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    async save(product: Product): Promise<Product> {
        return this.ormRepository.save(product);
    }
}
