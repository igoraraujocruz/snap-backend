import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { Client } from '../infra/typeorm/entities/Client';

@injectable()
export class GetClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(clientId: string): Promise<Client | undefined> {

        const client = await this.clientsRepository.findById(clientId);

        return client;
    }
}
