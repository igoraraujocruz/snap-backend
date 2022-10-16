import { User } from '@modules/users/infra/typeorm/entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UsersAndQuantityOfUsers } from '../dtos/UsersAndQuantityOfUsers';

export interface IUsersRepository {
    findByUsername(username: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByName(name: string): Promise<User[]>;
    findByMobilePhone(mobilePhone: string): Promise<User | undefined>;
    create({ name, password, email, mobilePhone, permissions, username}: CreateUserDTO): Promise<User>;
    findById(userId: string): Promise<User | undefined>;
    findAll(page?: number, usersPerPage?: number): Promise<UsersAndQuantityOfUsers>
    save(client: User): Promise<User>;
    delete(userId: string): Promise<void>;
    findAllUsersByUsername(username: string): Promise<User[]>
}
