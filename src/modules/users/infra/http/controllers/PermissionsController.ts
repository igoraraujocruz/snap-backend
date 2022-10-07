import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetPermissionService } from 'modules/users/services/GetPermissionService';
import { classToClass } from 'class-transformer';

export class PermissionsController {
    public async list(
        request: Request,
        response: Response,
    ): Promise<Response> {

        const list = container.resolve(
            GetPermissionService,
        );

        const role = await list.execute();

        return response.status(200).json(classToClass(role));
    }
}
