import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { CreateUserTokenDTO } from '../dtos/CreateUserTokenDTO';

export interface IUsersTokensRepository {
    create({
        expiresDate,
        refreshToken,
        userId,
    }: CreateUserTokenDTO): Promise<UserToken>;

    findByUserIdAndRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<UserToken | undefined>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(refreshToken: string): Promise<UserToken | undefined>;
}
