import { getRepository, Repository } from 'typeorm';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { AppError } from '@shared/errors/AppError';
import { ClientsAndQuantityOfClients } from '@modules/clients/dtos/ClientsAndQuantityOfClients';
import { CreateClientDTO } from '@modules/clients/dtos/CreateClientDTO';

export class ClientsRepository implements IClientsRepository
{
    private ormRepository: Repository<Client>;

    constructor() {
        this.ormRepository = getRepository(Client);;
    }

    async findByUsername(username: string): Promise<Client | undefined> {
        const item = this.ormRepository.findOne({
            where: { username },
        });

        return item;
    }

    async create(client: CreateClientDTO): Promise<Client> {
        const clientCreated = this.ormRepository.create(client);

        await this.ormRepository.save(clientCreated);

        return clientCreated;
    }

    async findByEmail(email: string): Promise<Client | undefined> {
        const item = this.ormRepository.findOne({
            where: { email },
        });

        return item;
    }

    async findById(clientId: string): Promise<Client | undefined> {
        const item = this.ormRepository.findOne({
            where: { id: clientId },
        });

        return item;
    }

    async findByMobilePhone(
        mobilePhone: string,
    ): Promise<Client | undefined> {
        const item = this.ormRepository.findOne({
            where: { mobilePhone },
        });

        return item;
    }

    async findByCpf(cpf: string): Promise<Client | undefined> {
        const item = this.ormRepository.findOne({
            where: { cpf },
        });

        return item;
    }

    async findAll(page: number, clientsPerPage: number): Promise<ClientsAndQuantityOfClients> {
        const quantityOfClient = await this.ormRepository.find();

        const clients = await this.ormRepository.find({
            take: clientsPerPage,
            skip: (page - 1) * clientsPerPage
        });

        return {
            quantityOfClient: quantityOfClient.length,
            clients: clients
        };
    }

    async save(client: Client): Promise<Client> {
        return this.ormRepository.save(client);
    }

    async delete(clientId: string): Promise<void> {
        await this.ormRepository.softDelete(clientId);
    }

    async addPoints({id, points}: Pick<Client, 'id' | 'points'>): Promise<void> {

        const client = await this.findById(id)

        if (!client) {
            throw new AppError('Client não encontrado.', 401);
        }
        
        client.points += points

        await this.save(client)

    }

    async decreasePoints({id, points}: Pick<Client, 'id' | 'points'>): Promise<void> {

        const client = await this.findById(id)

        if (!client) {
            throw new AppError('Client não encontrado.', 401);
        }
        
        client.points -= points

        await this.save(client)

    }

    async findAllByName(name: string): Promise<Client[]> {
        const item = this.ormRepository
        .createQueryBuilder('client')
        .leftJoinAndSelect('client.shop', 'shop')
        .where('LOWER(client.name) = LOWER(:name)', { name })
        .getMany();

        return item;
    }
}
