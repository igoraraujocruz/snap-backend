import { inject, injectable } from 'tsyringe';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { CreateClientDTO } from '@modules/clients/dtos/CreateClientDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({
        name,
        email,
        mobilePhone,
        birthday,
        cpf,
    }: CreateClientDTO): Promise<Client> {
        const emailExist = await this.clientsRepository.findByEmail(email);

        const mobilePhoneExist = await this.clientsRepository.findByMobilePhone(
            mobilePhone,
        );

        const cpfExist = await this.clientsRepository.findByCpf(cpf);

        if (emailExist) {
            throw new AppError('This email already exist');
        }

        if (mobilePhoneExist) {
            throw new AppError('This mobile Phone already exist');
        }

        if (cpfExist) {
            throw new AppError('This cpf already exist');
        }

        const user = await this.clientsRepository.create({
            name,
            email,
            mobilePhone,
            birthday,
            cpf,
        });

        return user;
    }
}
