import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    _: Response,
    next: NextFunction,
): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: userId } = verify(
            token,
            authConfig.jwt.secret,
        ) as IPayload;

        request.user = {
            id: userId,
        };

        return next();
    } catch (err) {
        console.log(err);
        throw new AppError('Invalid JWT token', 401);
    }
}
