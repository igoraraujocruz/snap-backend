import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserPermissionService } from '@modules/usersPermissions/services/CreateUserPermissionService';
/* import { DeleteProviderAgreementService } from '@modules/providersAgreements/services/DeleteProviderAgreementService'; */
import { classToClass } from 'class-transformer';

export class UsersPermissionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { userId, permissionId } = request.body;

        console.log(permissionId)

        const createUserPermissionService = container.resolve(
            CreateUserPermissionService,
        );

        const usersPermissions = await createUserPermissionService.execute({
            userId, permissionId
        });

        return response.status(200).json(classToClass(usersPermissions));
    }

  /*   public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteProviderAgreementService = container.resolve(
            DeleteProviderAgreementService,
        );

        const providerAgreementDeleted =
            await deleteProviderAgreementService.delete(id);

        return response.json(classToClass(providerAgreementDeleted));
    } */
}