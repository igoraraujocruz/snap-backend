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

interface ITokenResponse {
    token: string;
    refreshToken: string;
}

@injectable()
export class RefreshTokenService {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
    ) {}

    public async execute(newRefreshToken: string): Promise<ITokenResponse> {
        const { email, sub } = verify(
            newRefreshToken,
            auth.jwt.refreshTokenSecret,
        ) as IPayload;

        const userId = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                userId,
                newRefreshToken,
            );

        if (!userToken) {
            throw new AppError('Refresh Token does not exists!');
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refreshToken = sign({ email }, auth.jwt.refreshTokenSecret, {
            subject: sub,
            expiresIn: auth.jwt.expiresInRefreshToken,
        });

        const date = dayjs().add(10, 's');

        await this.usersTokensRepository.create({
            refreshToken,
            userId,
            expiresDate: date.toDate(),
        });

        const newToken = sign({}, auth.jwt.secret, {
            subject: userId,
            expiresIn: auth.jwt.expiresIn,
        });

        return {
            refreshToken,
            token: newToken,
        };
    }
}
