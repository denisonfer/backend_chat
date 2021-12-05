import { container } from 'tsyringe';

import { BcryptProvider } from './HashProvider/implementations/BcryptProvider';
import { IHashProvider } from './HashProvider/models/IHashProviders';

container.registerSingleton<IHashProvider>('HashProvider', BcryptProvider);
