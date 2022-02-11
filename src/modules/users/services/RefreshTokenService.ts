import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersTokensRepository } from '../repositories/IUsersTokensRepository';

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
export class RefreshTokenService {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}

    public async execute(token: string): Promise<string> {
        const { email, sub } = verify(
            token,
            auth.jwt.refreshTokenSecret,
        ) as IPayload;

        const userId = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                userId,
                token,
            );

        if (!userToken) {
            throw new AppError('Refresh Token does not exists!');
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refreshToken = sign({ email }, auth.jwt.refreshTokenSecret, {
            subject: sub,
            expiresIn: auth.jwt.expiresInRefreshToken,
        });

        const date = dayjs().add(30, 'day');

        await this.usersTokensRepository.create({
            refreshToken,
            userId,
            expiresDate: date.toDate(),
        });

        return refreshToken;
    }
}
