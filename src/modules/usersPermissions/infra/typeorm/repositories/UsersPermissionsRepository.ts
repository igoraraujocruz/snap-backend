import { getRepository, Repository } from 'typeorm';
import { IUsersPermissions } from '@modules/usersPermissions/repositories/IUsersPermissions';
import { UsersPermissions } from '@modules/usersPermissions/infra/typeorm/entities/UsersPermissions';
import { CreateUsersPermissionsDTO } from '@modules/usersPermissions/dtos/CreateUsersPermissionsDTO';

export class UsersPermissionsRepository implements IUsersPermissions
{
    private ormRepository: Repository<UsersPermissions>;

    constructor() {
        this.ormRepository = getRepository(UsersPermissions);
    }

    async create({ permissionId, userId }: CreateUsersPermissionsDTO): Promise<UsersPermissions> {
        const usersPermissions = this.ormRepository.create({ permissionId, userId });

        const usersPermissionsCreated = await this.ormRepository.save(usersPermissions);

        return usersPermissionsCreated;
    }

}