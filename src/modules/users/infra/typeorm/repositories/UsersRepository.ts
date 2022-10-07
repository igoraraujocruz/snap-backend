import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

@EntityRepository(User)
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
        const item = await this.ormRepository.findOne({
            where: { username },
        });

        return item;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            email,
        });

        return user;
    }
    

    public async findByMobilePhone(
        mobilePhone: string,
    ): Promise<User | undefined> {
        const item = await this.ormRepository.findOne({
            where: { mobilePhone },
        });

        return item;
    }

    async findAllByName(name: string): Promise<User[]> {
        const item = this.ormRepository
        .createQueryBuilder('user')
        .where('LOWER(user.name) = LOWER(:name)', { name })
        .getMany();

        return item;
    }
}
