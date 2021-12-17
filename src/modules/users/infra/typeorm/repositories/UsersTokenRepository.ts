import { getRepository, Repository } from 'typeorm';
import { IUserTokensRepositoy } from '@modules/users/repositories/IUserTokensRepository';
import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';

export class UsersTokenRepository implements IUserTokensRepositoy {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });
        return userToken;
    }

    public async generate(userId: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            userId,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}
