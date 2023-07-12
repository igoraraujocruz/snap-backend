import { EntityRepository, getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    async create(user: User): Promise<User> {
        const userCreated = this.ormRepository.create(user);

        await this.ormRepository.save(userCreated);

        return userCreated;
    }

    async findById(userId: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            order: {
                createdAt: 'ASC',
            },
            where: {
                id: userId,
            },
        });

        return user;
    }

    async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    async delete(userId: string): Promise<void> {
        await this.ormRepository.softDelete(userId);
    }

    async findAll(page: number, usersPerPage: number): Promise<User[]> {
        const users = await this.ormRepository.find({
            take: usersPerPage,
            skip: (page - 1) * usersPerPage,
        });

        return users;
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const item = await this.ormRepository.findOne({
            where: { username },
        });

        return item;
    }

    async findByName(option: string): Promise<User[]> {
        const users = this.ormRepository
            .createQueryBuilder('user')
            .where('LOWER(user.name) = LOWER(:name)', { name: option })
            .getMany();

        return users;
    }

    async findAllUsersByUsername(option: string): Promise<User[]> {
        const users = this.ormRepository
            .createQueryBuilder('user')
            .where('LOWER(user.username) = LOWER(:username)', {
                username: option,
            })
            .getMany();

        return users;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            email,
        });

        return user;
    }

    async findByMobilePhone(mobilePhone: string): Promise<User | undefined> {
        const item = await this.ormRepository.findOne({
            where: { mobilePhone },
        });

        return item;
    }
}
