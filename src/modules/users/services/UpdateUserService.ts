import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        id,
        name,
        email,
        password,
        mobilePhone,
        username,
    }: UpdateUserDTO): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.username === 'admin') {
            throw new AppError('Não é possível editar o usuário administrador');
        }
        const userWithUpdatedEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('E-mail is already in use');
        }

        const usernameExist = await this.usersRepository.findByUsername(
            username,
        );

        if (usernameExist) {
            throw new AppError('Username is already in use');
        }

        user.name = name;
        user.email = email;
        user.password = await this.hashProvider.generateHash(password);
        user.mobilePhone = mobilePhone;
        user.username = username;

        return this.usersRepository.save(user);
    }
}
