import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '../infra/typeorm/entities/User';

@injectable()
export class GetUserByUserIdService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(userId: string): Promise<User | undefined> {
        const users = await this.usersRepository.findById(userId);

        return users;
    }
}
