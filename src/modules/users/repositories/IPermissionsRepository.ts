import { Permission } from '@modules/users/infra/typeorm/entities/Permission';

export interface IPermissionsRepository {
    findByName(name: string): Promise<Permission | undefined>;
    findMany(names: string[]): Promise<Permission[]>;
    findAll(): Promise<Permission[]>
}
