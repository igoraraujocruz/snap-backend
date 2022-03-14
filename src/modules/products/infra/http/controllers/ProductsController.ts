import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductService } from '@modules/products/services/CreateProductService';
import { DeleteProductService } from '@modules/products/services/DeleteProductService';
import { UpdateProductService } from '@modules/products/services/UpdateProductService';
import { GetProductService } from '@modules/products/services/GetProductService';
import { classToClass } from 'class-transformer';

export class ProductsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, images, points } = request.body;

        const createProduct = container.resolve(CreateProductService);

        const product = await createProduct.execute({
            name,
            images,
            points,
            userId: request.user.id,
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

            const productDeleted = await deleteProduct.delete(id);

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
        const { name, images, points } = request.body;

        const updateClient = container.resolve(UpdateProductService);

        const clientUpdated = await updateClient.update({
            id,
            name,
            images,
            points,
            userId: request.user.id,
        });

        return response.json(classToClass(clientUpdated));
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const findProduct = container.resolve(GetProductService);

        const product = await findProduct.execute(id);

        return response.json(classToClass(product));
    }
}
