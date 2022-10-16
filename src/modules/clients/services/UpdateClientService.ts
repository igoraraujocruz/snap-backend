import { inject, injectable } from 'tsyringe';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { UpdateClientDTO } from '@modules/clients/dtos/UpdateClientDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({
        id,
        name,
        email,
        birthday,
        mobilePhone,
        cpf,
    }: UpdateClientDTO): Promise<Client> {
        const client = await this.clientsRepository.findById(id);

        if (!client) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.clientsRepository.findByEmail(
            email,
        );

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== client.id) {
            throw new AppError('E-mail is already in use');
        }

        const cpfExist = await this.clientsRepository.findByCpf(cpf);

        if (cpfExist) {
            throw new AppError('Cpf is already in use');
        }

        const clientPhoneExist = await this.clientsRepository.findByMobilePhone(
            mobilePhone,
        );

        if (clientPhoneExist) {
            throw new AppError('Mobile phone is already in use');
        }

        client.name = name;
        client.email = email;

        client.mobilePhone = mobilePhone;
        client.birthday = birthday;
        client.cpf = cpf;

        return this.clientsRepository.save(client);
    }
}
