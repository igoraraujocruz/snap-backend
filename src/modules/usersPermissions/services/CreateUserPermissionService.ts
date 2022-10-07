import { inject, injectable } from 'tsyringe';
import { UsersPermissions } from '../infra/typeorm/entities/UsersPermissions';
import { IUsersPermissionsRepository } from '../repositories/IUsersPermissions';
import { CreateUsersPermissionsDTO } from '../dtos/CreateUsersPermissionsDTO';

@injectable()
export class CreateUserPermissionService {
    constructor(
        @inject('UsersPermissionsRepository')
        private usersPermissionsRepository: IUsersPermissionsRepository,
    ) {}

    public async execute({
        userId,
        permissionId
    }: CreateUsersPermissionsDTO): Promise<UsersPermissions> {

        const usersPermissions =
            await this.usersPermissionsRepository.create({
                userId,
                permissionId
            });

        return usersPermissions;
    }
}