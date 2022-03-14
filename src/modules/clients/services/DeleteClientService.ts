import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

@injectable()
export class DeleteClientService extends BaseService<Client> {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {
        super(clientsRepository);
    }
}
