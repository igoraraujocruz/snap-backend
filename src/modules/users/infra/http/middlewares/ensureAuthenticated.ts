import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { UsersTokensRepository } from '../../typeorm/repositories/UsersTokenRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    _: Response,
    next: NextFunction,
): Promise<void> {
    const authHeader = request.headers.authorization;

    const usersTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: userId } = verify(
            token,
            authConfig.jwt.refreshTokenSecret,
        ) as IPayload;

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            userId,
            token,
        );

        if (!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: userId,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token', 401);
    }
}
