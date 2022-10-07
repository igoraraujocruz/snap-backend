import { NextFunction, Request, Response } from "express";
import { AppError } from '@shared/errors/AppError';
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../typeorm/repositories/UsersRepository";
import { User } from "../../typeorm/entities/User";

interface IPayload {
    sub: string;
}

async function decoder(request: Request): Promise<User | undefined> {
    const authHeader = request.headers.authorization || '';
    const userRepository = getCustomRepository(UsersRepository) 

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');
    const { sub } = decode(token) as IPayload    

    const user = await userRepository.findById(sub)

    return user;
}

export function can(permissions: string[]) {
    return async(request: Request, response: Response, next: NextFunction) => {
        const user = await decoder(request);

        const userPermissions = user?.permissions.map(permission => permission.name)

        const existsPermissions =  userPermissions?.some(p => permissions.includes(p))

        if (existsPermissions) {
            return next();
        }

        return response.status(401).json({ message: 'Não autorizado!' })
    }
}