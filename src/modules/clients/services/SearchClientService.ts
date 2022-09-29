import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '../repositories/IClientsRepository'
import { Client } from '../infra/typeorm/entities/Client';

@injectable()
export class SearchClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(option: string): Promise<Client[]> {
        const clients = await this.clientsRepository.findAllByName(
            option,
        );

        return clients;
    }
}
