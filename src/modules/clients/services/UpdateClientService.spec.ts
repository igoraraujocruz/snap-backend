import 'reflect-metadata';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let updateUserService: UpdateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Update User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
        updateUserService = new UpdateUserService(fakeUserRepository);
    });

    it('Sould be able to update a user', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '988845465',
            username: 'johnjohn',
        });

        const name = 'fulano';
        const password = '654321';
        const email = 'fulano@gmail.com';
        const mobilePhone = '988845465';
        const username = 'johnjohn';

        const updatedUser = await updateUserService.execute({
            id: user.id,
            name,
            password,
            email,
            mobilePhone,
            username,
        });

        expect(updatedUser.name).toBe(name);
        expect(updatedUser.password).toBe(password);
        expect(updatedUser.email).toBe(email);
    });

    it('Sould not be able if user is not found', async () => {
        await expect(
            updateUserService.execute({
                id: 'dsa64d6as8d',
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456',
                mobilePhone: '988845465',
                username: 'johnjohn',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Sould not be able if user email is already in use', async () => {
        const email = 'johndoe@example.com';

        await fakeUserRepository.create({
            name: 'Jonathan',
            email,
            password: '123456',
            mobilePhone: '988845465',
            username: 'johnjohn',
        });

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email,
            password: '123456',
            mobilePhone: '988845465',
            username: 'johnjohn',
        });

        await expect(
            updateUserService.execute({
                id: user.id,
                name: 'John Doe',
                email,
                password: '123456',
                mobilePhone: '988845465',
                username: 'johnjohn',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Sould not be able update if username is already in use', async () => {
        const user = await fakeUserRepository.create({
            name: 'Jonathan',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '988845465',
            username: 'johnjohn',
        });

        const newUser = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoeagain@example.com',
            password: '123456',
            mobilePhone: '988845465',
            username: 'johntest',
        });

        jest.spyOn(fakeUserRepository, 'findByUsername').mockImplementationOnce(
            async () => user,
        );

        await expect(
            updateUserService.execute({
                id: newUser.id,
                name: 'John Doe',
                email: 'johndoeagain@example.com',
                password: '123456',
                mobilePhone: '988845465',
                username: user.username,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
