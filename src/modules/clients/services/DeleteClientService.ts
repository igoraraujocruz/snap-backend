import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

@injectable()
export class DeleteClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    async execute(clientId: string): Promise<void> {
        await this.clientsRepository.delete(clientId);
    }
}
