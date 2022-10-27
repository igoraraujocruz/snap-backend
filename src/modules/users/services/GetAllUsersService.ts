import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '../infra/typeorm/entities/User';

@injectable()
export class GetAllUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(
        page?: number,
        usersPerPage?: number,
    ): Promise<User[]> {
        const users = await this.usersRepository.findAll(page, usersPerPage);

        return users;
    }
}
