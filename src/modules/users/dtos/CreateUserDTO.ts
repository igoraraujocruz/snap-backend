import { Permission } from "../infra/typeorm/entities/Permission";

export interface CreateUserDTO {
    name: string;
    username: string;
    password: string;
    email: string;
    mobilePhone: string;
    permissions: Permission[];
}
