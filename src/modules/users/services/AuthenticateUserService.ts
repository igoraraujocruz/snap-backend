import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { injectable, inject } from 'tsyringe';
import dayjs from 'dayjs';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';
import { Permission } from '../infra/typeorm/entities/Permission';

interface IRequest {
    username: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        username: string;
        email: string;
        permissions: Permission[];
    };
    token: string;
    refreshToken: string;
}

@injectable()
export class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}

    public async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByUsername(username);

        if (!user) {
            throw new AppError('Username ou a senha invalidos', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Username ou a senha invalidos', 401);
        }

        const { secret, expiresIn, refreshTokenSecret, expiresInRefreshToken } =
            auth.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        const refreshToken = sign({ username }, refreshTokenSecret, {
            subject: user.id,
            expiresIn: expiresInRefreshToken,
        });

        const date = dayjs().add(15, 'm');

        await this.usersTokensRepository.create({
            expiresDate: date.toDate(),
            refreshToken,
            userId: user.id,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                username: user.username,
                email: user.email,
                permissions: user.permissions,
            },
            refreshToken,
        };

        return tokenReturn;
    }
}
