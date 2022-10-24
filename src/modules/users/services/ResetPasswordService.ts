import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
export class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token,
        );

        if (!userToken) {
            throw new AppError('Token invalid');
        }

        const user = await this.usersRepository.findById(userToken.userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}
