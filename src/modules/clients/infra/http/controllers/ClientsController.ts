import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientService } from '@modules/clients/services/CreateClientService';
import { DeleteClientService } from '@modules/clients/services/DeleteClientService';
import { UpdateClientService } from '@modules/clients/services/UpdateClientService';
import { GetClientService } from '@modules/clients/services/GetClientService';
import { classToClass } from 'class-transformer';

export class ClientsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, cpf, email, mobilePhone, birthday } = request.body;

        const createClient = container.resolve(CreateClientService);

        const client = await createClient.execute({
            name,
            cpf,
            birthday,
            email,
            mobilePhone,
        });

        return response.status(200).json(classToClass(client));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const deleteClient = container.resolve(DeleteClientService);

            const clientDeleted = await deleteClient.delete(id);

            return response.json(classToClass(clientDeleted));
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, cpf, email, mobilePhone, birthday } = request.body;

        const updateClient = container.resolve(UpdateClientService);

        const clientUpdated = await updateClient.update({
            id,
            name,
            cpf,
            email,
            mobilePhone,
            birthday,
        });

        return response.json(classToClass(clientUpdated));
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const findClient = container.resolve(GetClientService);

        const client = await findClient.execute(id);

        return response.json(classToClass(client));
    }
}
