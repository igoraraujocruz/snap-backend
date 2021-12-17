import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';

export interface IUsersTokensRepositoy {
    generate(id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
}
