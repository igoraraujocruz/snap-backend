import { inject, injectable } from 'tsyringe';
import { Permission } from '@modules/users/infra/typeorm/entities/Permission';
import { IPermissionsRepository } from '@modules/users/repositories/IPermissionsRepository';

@injectable()
export class GetPermissionService {
    constructor(
        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    public async execute(): Promise<Permission[]> {
        const permissions = await this.permissionsRepository.findAll();

        return permissions;
    }
}
