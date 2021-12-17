import 'reflect-metadata';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Create User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
    });

    it('Sould be able to create a new User', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '995524565',
            username: 'johnjohn',
        });

        expect(user).toHaveProperty('id');
    });

    it('Sould not to be able to create a new User if email already exist', async () => {
        const name = 'John Doe';
        const password = '123456';
        const email = 'joedoe@gmail.com';
        const mobilePhone = '98989898';
        const username = 'jhonjohn';

        const user = await createUserService.execute({
            name,
            email,
            password,
            mobilePhone,
            username,
        });

        jest.spyOn(fakeUserRepository, 'findByEmail').mockImplementationOnce(
            async () => user,
        );

        await expect(
            createUserService.execute({
                name,
                password,
                email,
                mobilePhone,
                username,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Sould not to be able to create a new User if username already exist', async () => {
        const name = 'John Doe';
        const password = '123456';
        const email = 'joedoe@gmail.com';
        const mobilePhone = '98989898';
        const username = 'jhonjohn';

        const user = await createUserService.execute({
            name,
            email,
            password,
            mobilePhone,
            username,
        });

        jest.spyOn(fakeUserRepository, 'findByUsername').mockImplementationOnce(
            async () => user,
        );

        await expect(
            createUserService.execute({
                name,
                password,
                email,
                mobilePhone,
                username,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Sould not to be able to create a new User if mobilePhone already exist', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jonathan',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '988845465',
            username: 'johnjohn',
        });

        await expect(
            createUserService.execute({
                name: 'Gohan',
                email: 'gohan@example.com',
                password: '123456',
                mobilePhone: user.mobilePhone,
                username: 'johnjohn',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
