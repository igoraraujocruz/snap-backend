import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(userId: string): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (user?.username === 'admin') {
            throw new AppError(
                'Não é possível excluir o usuário administrador',
            );
        }
        await this.usersRepository.delete(userId);
    }
}
