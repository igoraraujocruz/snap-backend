import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { CreateClientDTO } from '../dtos/CreateClientDTO';

export interface IClientsRepository {
    findByUsername(username: string): Promise<Client | undefined>;
    findByEmail(email: string): Promise<Client | undefined>;
    findByMobilePhone(mobilePhone: string): Promise<Client | undefined>;
    findByCpf(cpf: string): Promise<Client | undefined>;
    addPoints({ points, id }: Pick<Client, 'points' | 'id'>): Promise<void>;
    decreasePoints({
        points,
        id,
    }: Pick<Client, 'points' | 'id'>): Promise<void>;
    findAllByName(name: string): Promise<Client[]>;
    findById(clientId: string): Promise<Client | undefined>;
    save(client: Client): Promise<Client>;
    delete(clientId: string): Promise<void>;
    findAll(page?: number, clientsPerPage?: number): Promise<Client[]>;
    create(client: CreateClientDTO): Promise<Client>;
}
