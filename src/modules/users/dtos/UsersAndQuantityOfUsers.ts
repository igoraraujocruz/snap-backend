import { User } from "../infra/typeorm/entities/User";

export interface UsersAndQuantityOfUsers {
    quantityOfUsers: number;
    users: User[]
}