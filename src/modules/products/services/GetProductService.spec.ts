import 'reflect-metadata';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { GetUserService } from '@modules/users/services/GetUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let getUserService: GetUserService;
let fakeUserRepository: FakeUserRepository;

describe('Get User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
        getUserService = new GetUserService(fakeUserRepository);
    });

    it('Should be able to list all users', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '987546878',
            username: 'johnjhon',
        });

        const users = await getUserService.execute();

        expect(users).toEqual(expect.arrayContaining([user]));
    });

    it('Should be able to list user by id', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '987546878',
            username: 'johnjhon',
        });

        const findUser = await getUserService.execute(user.id);

        expect(findUser);
    });

    it('Should not be able to list user if id not exist', async () => {
        const id = 'adiasdhaidhasiudhiahdu';
        await expect(getUserService.execute(id)).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
