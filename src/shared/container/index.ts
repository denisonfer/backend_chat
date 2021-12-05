import { container } from 'tsyringe';

import '@domains/users/providers';

import { UsersRepository } from '@domains/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
