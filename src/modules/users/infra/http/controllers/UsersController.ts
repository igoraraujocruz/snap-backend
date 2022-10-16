import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { UpdateUserPermissionService } from '@modules/users/services/UpdateUserPermissionService';
import { GetAllUsersService } from '@modules/users/services/GetAllUsersService';
import { GetMyUserService } from '@modules/users/services/GetMyUserService';
import { classToClass } from 'class-transformer';
import { GetUserByUserIdService } from '@modules/users/services/GetUserByUserIdService';
import { FindUsersService } from '@modules/users/services/FindUsersService';

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
            const { userId } = request.params;

            const deleteUser = container.resolve(DeleteUserService);

            const userDeleted = await deleteUser.execute(userId);

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

        const userUpdated = await updateUser.execute({
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

        const updateUserPermission = container.resolve(UpdateUserPermissionService);

        const userPermissionUpdated = await updateUserPermission.execute({
            id,
            permissions
        });

        return response.json(classToClass(userPermissionUpdated));
    }

    public async getUsers(request: Request, response: Response): Promise<Response> {
        const { userId, option, page, usersPerPage } = request.query

        if(userId) {
            const findUser = container.resolve(GetUserByUserIdService);

            const user = await findUser.execute(String(userId));

            return response.json(classToClass(user));

        }

        if (option) {
            const findUser = container.resolve(FindUsersService);

            const user = await findUser.execute(String(option));

            return response.json(classToClass(user));
        }

        const findUsers = container.resolve(GetAllUsersService);

        const users = await findUsers.execute(Number(page), Number(usersPerPage));

        return response.json(classToClass(users));
    }

    public async getMyUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.user

        const findUser = container.resolve(GetMyUserService);

        const user = await findUser.execute(id);

        return response.json(classToClass(user));
    }
}
