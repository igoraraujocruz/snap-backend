import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        mobilePhone,
        password,
        username,
    }: CreateUserDTO): Promise<User> {
        const usernameExist = await this.usersRepository.findByUsername(
            username,
        );

        const emailExist = await this.usersRepository.findByEmail(email);

        const mobilePhoneExist = await this.usersRepository.findByMobilePhone(
            mobilePhone,
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

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            mobilePhone,
            password: hashedPassword,
            username,
        });

        return user;
    }
}
