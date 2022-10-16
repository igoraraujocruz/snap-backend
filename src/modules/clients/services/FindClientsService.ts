import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { Client } from '../infra/typeorm/entities/Client';

@injectable()
export class FindClientsService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(option: string): Promise<Client[]> {

        const nameFound = await this.clientsRepository.findAllByName(option);

        return nameFound;
    }
}
