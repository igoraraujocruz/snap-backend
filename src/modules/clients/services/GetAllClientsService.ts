import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsAndQuantityOfClients } from '../dtos/ClientsAndQuantityOfClients';

@injectable()
export class GetAllClientsService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(page?: number, clientsPerPage?: number): Promise<ClientsAndQuantityOfClients> {
        const clients = await this.clientsRepository.findAll(page, clientsPerPage);

        return clients;
    }
}
