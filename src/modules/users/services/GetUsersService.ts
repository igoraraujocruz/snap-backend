import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class GetUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(id?: string): Promise<User[] | User> {

        if (id) {
            const user = await this.usersRepository.findById(id);

            if (!user) {
                throw new AppError('User not found');
            }

            return user;
        }

        const users = await this.usersRepository.findAll();

        return users;
    }
}
