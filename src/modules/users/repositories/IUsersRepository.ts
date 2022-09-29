import { User } from '@modules/users/infra/typeorm/entities/User';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface IUsersRepository extends IBaseRepository<User> {
    findByUsername(username: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByMobilePhone(mobilePhone: string): Promise<User | undefined>;
    findAllByName(name: string): Promise<User[]>;
}
