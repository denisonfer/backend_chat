import { container } from 'tsyringe';

import '@domains/users/providers';
import './providers';

import { UsersRepository } from '@domains/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IRecoveryPassMailTokensRepository } from '@domains/users/repositories/IRecoveryPassMailTokensRepository';
import { RecoveryPassMailTokensRepository } from '@domains/users/infra/typeorm/repositories/RecoveryPassMailTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRecoveryPassMailTokensRepository>(
  'RecoveryPassMailTokensRepository',
  RecoveryPassMailTokensRepository,
);
