import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { Client } from '../infra/typeorm/entities/Client';

@injectable()
export class GetAllClientsService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(
        page?: number,
        clientsPerPage?: number,
    ): Promise<Client[]> {
        const clients = await this.clientsRepository.findAll(
            page,
            clientsPerPage,
        );

        return clients;
    }
}
