import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersAndQuantityOfUsers } from '../dtos/UsersAndQuantityOfUsers';

@injectable()
export class GetAllUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(page?: number, usersPerPage?: number): Promise<UsersAndQuantityOfUsers> {

        const users = await this.usersRepository.findAll(page, usersPerPage);

        return users;
    }
}
