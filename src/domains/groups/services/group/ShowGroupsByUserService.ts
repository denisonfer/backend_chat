import { inject, injectable } from 'tsyringe';

import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';
import { Group } from '@domains/groups/infra/typeorm/entities/Group';

@injectable()
export class ShowGroupsByUserService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<Group[]> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const groupsByUser = await this.usersGroupsRepository.findGroupsByUser(
      user.id,
    );

    const groups = groupsByUser.map(groupData => groupData.group);

    return groups;
  }
}
