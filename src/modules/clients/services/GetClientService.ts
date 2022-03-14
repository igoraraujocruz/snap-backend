import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class GetClientService extends BaseService<Client> {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {
        super(clientsRepository);
    }

    public async execute(id?: string): Promise<Client | Client[]> {
        if (id) {
            const client = await this.clientsRepository.findById(id);

            if (!client) {
                throw new AppError('Client not found');
            }

            return client;
        }

        const clients = await this.clientsRepository.findAll();

        return clients;
    }
}
