import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { UploadPhotoService } from '@modules/photos/services/UploadPhotoService';
import { DeleteProductService } from '@modules/products/services/DeleteProductService';
import { UpdateProductService } from '@modules/products/services/UpdateProductService';
import { GetProductService } from '@modules/products/services/GetProductService';
import { classToClass } from 'class-transformer';
import slugify from 'slugify';
import { SearchProductService } from '@modules/products/services/SearchProductService';
import { GetProductBySlugService } from '@modules/products/services/GetProductBySlugService';
import { GetProductByIdService } from '@modules/products/services/GetProductByIdService';

export class ProductsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, creditPoints, debitPoints, description, price } =
            request.body;

        const createProduct = container.resolve(CreateProductService);

        const uploadPhotos = container.resolve(UploadPhotoService);

        const product = await createProduct.execute({
            name,
            slug: slugify(name, {
                lower: true,
            }),
            price,
            description,
            creditPoints,
            debitPoints,
            userId: request.user.id,
        });

        request.files.forEach(nome => {
            uploadPhotos.execute({
                name: nome.filename,
                productId: product.id,
            });
        });

        return response.status(200).json(classToClass(product));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const deleteProduct = container.resolve(DeleteProductService);

            const productDeleted = await deleteProduct.execute(id);

            return response.json(classToClass(productDeleted));
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, creditPoints, debitPoints } = request.body;

        const updateClient = container.resolve(UpdateProductService);

        const clientUpdated = await updateClient.update({
            id,
            name,
            creditPoints,
            debitPoints,
            userId: request.user.id,
        });

        return response.json(classToClass(clientUpdated));
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { productSlug, productId } = request.query as Record<string, string>;

        if (productSlug) {
            const findProduct = container.resolve(GetProductBySlugService);

            const product = await findProduct.execute(productSlug);

            return response.json(classToClass(product));
        }

        if (productId) {
            const findProduct = container.resolve(GetProductByIdService);

            const product = await findProduct.execute(productId);

            return response.json(classToClass(product));
        }

        const findAllProducts = container.resolve(GetProductService);

        const products = await findAllProducts.execute();

        return response.json(classToClass(products));
    }

    public async search(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { option } = request.params;

        const findProduct = container.resolve(SearchProductService);

        const product = await findProduct.execute(option);

        return response.json(classToClass(product));
    }
}
