import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, authConfig.jwt.secret);

    const { sub } = decode as ITokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}
