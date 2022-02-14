import { getRepository, Repository } from 'typeorm';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';
import { CreateUserTokenDTO } from '@modules/users/dtos/CreateUserTokenDTO';

export class UsersTokensRepository implements IUsersTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    async findByUserIdAndRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<UserToken | undefined> {
        const usersTokens = await this.ormRepository.findOne({
            userId,
            refreshToken,
        });

        return usersTokens;
    }

    public async create({
        expiresDate,
        refreshToken,
        userId,
    }: CreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            expiresDate,
            refreshToken,
            userId,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }

    public async deleteById(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}
