import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IPermissionsRepository } from '../repositories/IPermissionsRepository';

type ICreate = Omit<CreateUserDTO, 'permissions'>;
interface ICreateWithPermissions extends ICreate {
    permissions: string[];
}

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('PermissionsRepository')
        private permissionsRepository: IPermissionsRepository,
    ) {}

    public async execute({
        name,
        email,
        mobilePhone,
        password,
        username,
        permissions,
    }: ICreateWithPermissions): Promise<User> {
        const usernameExist = await this.usersRepository.findByUsername(
            username,
        );

        const emailExist = await this.usersRepository.findByEmail(email);

        const mobilePhoneExist = await this.usersRepository.findByMobilePhone(
            mobilePhone,
        );

        const findPermissions = await this.permissionsRepository.findMany(
            permissions,
        );

        if (usernameExist) {
            throw new AppError('This username already exist');
        }

        if (emailExist) {
            throw new AppError('This email already exist');
        }

        if (mobilePhoneExist) {
            throw new AppError('This mobile Phone already exist');
        }

        if (findPermissions.length !== permissions.length) {
            throw new AppError('Permission not found');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            mobilePhone,
            password: hashedPassword,
            username,
            permissions: findPermissions,
        });

        return user;
    }
}
