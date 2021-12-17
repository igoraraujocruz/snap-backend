import 'reflect-metadata';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let authenticateUserService: AuthenticateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('Authenticate User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        authenticateUserService = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to authenticate', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '997998654',
            username: 'JohnJohn',
        });

        const response = await authenticateUserService.execute({
            email: user.email,
            password: user.password,
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUserService.execute({
                email: 'johndoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        const name = 'John Doe';
        const email = 'johndoe@gmail.com';
        const password = '123456';
        const mobilePhone = '997986485';
        const username = 'johnjhon';

        await fakeUserRepository.create({
            name,
            email,
            password,
            mobilePhone,
            username,
        });

        await expect(
            authenticateUserService.execute({
                email,
                password: '654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
