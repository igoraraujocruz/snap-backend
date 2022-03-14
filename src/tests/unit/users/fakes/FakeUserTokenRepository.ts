import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { CreateUserTokenDTO } from '@modules/users/dtos/CreateUserTokenDTO';

export class FakeUserTokenRepository implements IUsersTokensRepository {
    private usersToken: UserToken[] = [];

    public async create(data: CreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, data);
        this.usersToken.push(userToken);

        return userToken;
    }

    public async deleteById(id: string): Promise<void> {
        const findIndex = this.usersToken.findIndex(
            findUser => findUser.id === id,
        );

        this.usersToken[findIndex].expiresDate = new Date();
    }

    public async findByUserIdAndRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<UserToken | undefined> {
        this.usersToken.find(user => user.id === userId);

        const newRefreshToken = this.usersToken.find(
            newRef => newRef.refreshToken === refreshToken,
        );

        return newRefreshToken;
    }
}
