import { container } from 'tsyringe';

import '@domains/users/providers';
import './providers';

import { UsersRepository } from '@domains/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IRecoveryPassMailTokensRepository } from '@domains/users/repositories/IRecoveryPassMailTokensRepository';
import { RecoveryPassMailTokensRepository } from '@domains/users/infra/typeorm/repositories/RecoveryPassMailTokensRepository';
import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { GroupsRepository } from '@domains/groups/infra/typeorm/repositories/GroupsRepository';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { UsersGroupsRepository } from '@domains/groups/infra/typeorm/repositories/UsersGroupsRepository';
import { IGiftsRepository } from '@domains/users/repositories/IGiftsRepository';
import { GiftsRepository } from '@domains/users/infra/typeorm/repositories/GiftsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRecoveryPassMailTokensRepository>(
  'RecoveryPassMailTokensRepository',
  RecoveryPassMailTokensRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IUsersGroupsRepository>(
  'UsersGroupsRepository',
  UsersGroupsRepository,
);

container.registerSingleton<IGiftsRepository>(
  'GiftsRepository',
  GiftsRepository,
);
