import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { UpdateUserPermissionService } from '@modules/users/services/UpdateUserPermissionService';
import { GetUsersService } from '@modules/users/services/GetUsersService';
import { GetMyUserService } from '@modules/users/services/GetMyUserService';
import { classToClass } from 'class-transformer';
import { SearchUserService } from '@modules/users/services/SearchUserService';

export class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, username, password, email, mobilePhone, permissions } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            username,
            password,
            email,
            mobilePhone,
            permissions
        });

        return response.status(200).json(classToClass(user));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { id } = request.params;

            const deleteUser = container.resolve(DeleteUserService);

            const userDeleted = await deleteUser.delete(id);

            return response.json(classToClass(userDeleted));
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, username, email, mobilePhone, password } = request.body;

        const updateUser = container.resolve(UpdateUserService);

        const userUpdated = await updateUser.update({
            id,
            name,
            username,
            email,
            mobilePhone,
            password,
        });

        return response.json(classToClass(userUpdated));
    }

    public async updatePermissions(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { permissions } = request.body;

        console.log(permissions)

        const updateUserPermission = container.resolve(UpdateUserPermissionService);

        const userPermissionUpdated = await updateUserPermission.execute({
            id,
            permissions
        });

        return response.json(classToClass(userPermissionUpdated));
    }

    public async getUsers(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const findUsers = container.resolve(GetUsersService);

        const users = await findUsers.execute(id);

        return response.json(classToClass(users));
    }

    public async getMyUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.user

        const findUser = container.resolve(GetMyUserService);

        const user = await findUser.execute(id);

        return response.json(classToClass(user));
    }

    async search(request: Request, response: Response): Promise<Response> {
        const { option } = request.params;

        const findUser = container.resolve(SearchUserService);

        const user = await findUser.execute(option);

        return response.json(classToClass(user));
    }
}
