import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import { IPhotosRepository } from '@modules/photos/repositories/IPhotosRepository';
import { PhotosRepository } from '@modules/photos/infra/typeorm/repositories/PhotosRepository';

import { IShopRepository } from '@modules/shop/repositories/IShopRepository';
import { ShopRepository } from '@modules/shop/infra/typeorm/repositories/ShopRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository,
);

container.registerSingleton<IClientsRepository>(
    'ClientsRepository',
    ClientsRepository,
);

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);

container.registerSingleton<IPhotosRepository>(
    'PhotosRepository',
    PhotosRepository,
);

container.registerSingleton<IShopRepository>('ShopRepository', ShopRepository);
