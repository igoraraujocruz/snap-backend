import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO';
import { v4 as uuid } from 'uuid';

export class FakeUserRepository implements IUsersRepository {
    private users: User[] = [];

    public async create(data: CreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid() }, data);
        this.users.push(user);

        return user;
    }

    public async update(data: UpdateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { id: uuid() }, data);
        this.users.push(user);

        return user;
    }

    public async delete(item: User): Promise<void> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === item.id,
        );

        this.users[findIndex].deletedAt = new Date();
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async findByUsername(name: string): Promise<User | undefined> {
        return this.users.find(user => user.name === name);
    }

    public async findByMobilePhone(
        mobilePhone: string,
    ): Promise<User | undefined> {
        return this.users.find(user => user.mobilePhone === mobilePhone);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    public async findAll(): Promise<User[]> {
        return this.users;
    }

    public async save(item: Partial<User>): Promise<User> {
        const user = new User();

        Object.assign(user, { id: item.id }, item);

        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}
