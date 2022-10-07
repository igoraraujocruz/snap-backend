import { CreateUsersPermissionsDTO } from "../dtos/CreateUsersPermissionsDTO";
import { UsersPermissions } from "../infra/typeorm/entities/UsersPermissions";

export interface IUsersPermissionsRepository {
    create({userId, permissionId}: CreateUsersPermissionsDTO): Promise<UsersPermissions>
}