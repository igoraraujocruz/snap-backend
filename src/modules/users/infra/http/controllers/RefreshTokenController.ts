import { RefreshTokenService } from '@modules/users/services/RefreshTokenService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const newRefreshToken =
            request.body.refreshToken ||
            request.headers['x-access-token'] ||
            request.query.refreshToken;

        const refreshTokenService = container.resolve(RefreshTokenService);
        const refreshToken = await refreshTokenService.execute(newRefreshToken);

        return response.json(refreshToken);
    }
}
