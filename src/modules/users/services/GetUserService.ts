import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class GetUserService extends BaseService<User> {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        super(usersRepository);
    }

    public async execute(id?: string): Promise<User | User[]> {
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
