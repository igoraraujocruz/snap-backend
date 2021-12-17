import { Request, Response } from 'express';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export class SessionsController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authController = container.resolve(AuthenticateUserService);

        const { user, token } = await authController.execute({
            email,
            password,
        });

        return response.json({ user: classToClass(user), token });
    }
}
