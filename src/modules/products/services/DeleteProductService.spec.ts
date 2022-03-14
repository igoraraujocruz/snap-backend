import 'reflect-metadata';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let deleteUserService: DeleteUserService;
let fakeUserRepository: FakeUserRepository;

describe('Delete User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
        deleteUserService = new DeleteUserService(fakeUserRepository);
    });

    it('Sould be able to delete a user', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            mobilePhone: '998754566',
            username: 'johnjohn',
        });

        await deleteUserService.delete(user.id);

        expect(200);
    });
});
