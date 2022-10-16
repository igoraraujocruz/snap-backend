import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UpdateUserPermissionDTO } from '@modules/users/dtos/UpdateUserPermissionDTO';
import { AppError } from '@shared/errors/AppError';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository';

@injectable()
export class UpdateUserPermissionService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    public async execute({
        id,
        permissions
    }: UpdateUserPermissionDTO): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuario não encontrado');
        }

        const findPermissions = await this.permissionsRepository.findMany(permissions)

        user.permissions = findPermissions;

        return this.usersRepository.save(user);
    }
}
