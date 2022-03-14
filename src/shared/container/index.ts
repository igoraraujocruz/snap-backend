import { container } from 'tsyringe';

import '@modules/users/providers';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository,
);
