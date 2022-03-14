import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface IClientsRepository extends IBaseRepository<Client> {
    findByUsername(username: string): Promise<Client | undefined>;
    findByEmail(email: string): Promise<Client | undefined>;
    findByMobilePhone(mobilePhone: string): Promise<Client | undefined>;
    findByCpf(cpf: string): Promise<Client | undefined>;
}
