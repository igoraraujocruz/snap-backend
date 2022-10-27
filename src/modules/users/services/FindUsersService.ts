import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '../infra/typeorm/entities/User';

@injectable()
export class FindUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(option: string): Promise<User[] | undefined> {
        const nameFound = await this.usersRepository.findByName(option);

        const usernameFound = await this.usersRepository.findAllUsersByUsername(
            option,
        );

        if (nameFound.length > 0) {
            return nameFound;
        }

        if (usernameFound.length > 0) {
            return usernameFound;
        }
    }
}
