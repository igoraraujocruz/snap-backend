import { getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

export class UsersRepository
    extends BaseRepository<User>
    implements IUsersRepository
{
    readonly ormRepository: Repository<User>;

    constructor() {
        const repo = getRepository(User);
        super(repo);
        this.ormRepository = repo;
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        const item = this.ormRepository.findOne({
            where: { username },
        });

        return item;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const item = this.ormRepository.findOne({
            where: { email },
        });

        return item;
    }

    public async findByMobilePhone(
        mobilePhone: string,
    ): Promise<User | undefined> {
        const item = this.ormRepository.findOne({
            where: { mobilePhone },
        });

        return item;
    }
}
