import { Request, Response } from 'express';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export class SessionsController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { username, password } = request.body;

        const authController = container.resolve(AuthenticateUserService);

        const { user, token, refreshToken } = await authController.execute({
            username,
            password,
        });

        return response.json({ user: classToClass(user), token, refreshToken });
    }
}
