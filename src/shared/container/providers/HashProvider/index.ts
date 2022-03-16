import { container } from 'tsyringe';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { BCryptHashProviders } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProviders);
