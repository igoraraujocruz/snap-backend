import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
export class DeleteUserService extends BaseService<User> {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {
        super(usersRepository);
    }
}
