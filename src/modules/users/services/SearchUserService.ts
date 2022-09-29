import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository'
import { User } from '../infra/typeorm/entities/User';

@injectable()
export class SearchUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(option: string): Promise<User[]> {
        const users = await this.usersRepository.findAllByName(
            option,
        );

        return users;
    }
}
