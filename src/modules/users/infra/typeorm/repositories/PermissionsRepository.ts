import { getRepository, In, Repository } from 'typeorm';
import { IPermissionsRepository } from '@modules/users/repositories/IPermissionsRepository';
import { Permission } from '@modules/users/infra/typeorm/entities/Permission';

export class PermissionsRepository implements IPermissionsRepository
{
    private ormRepository: Repository<Permission>;

    constructor() {
        this.ormRepository = getRepository(Permission);
    }

    public async findByName(name: string): Promise<Permission | undefined> {
        const item = await this.ormRepository.findOne({
            where: { name },
        });

        return item;
    }
    
    public async findAll(): Promise<Permission[]> {
        const item = this.ormRepository.find()

        return item;
    }

    public async findMany(names: string[]): Promise<Permission[]> {
        const items = this.ormRepository.find({
            where: {
                name: In(names)
            }
        })

        return items;
    }
}
