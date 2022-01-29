import { injectable, inject } from 'tsyringe';

import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { ServerError } from '@shared/error/ServerError';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';

@injectable()
export class DeleteGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) {}

  public async execute(id_group: string, id_user: string): Promise<void> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado!', 400);
    }

    const group = await this.groupsRepository.findById(id_group);

    if (!group) {
      throw new ServerError('Grupo não localizado!', 400);
    }

    const usersByGroup = await this.usersGroupsRepository.findUsersByGroup(
      id_group,
    );

    const userIsAdmin = usersByGroup.find(
      userInGroup => userInGroup.id_user === id_user && userInGroup.is_admin,
    );

    if (!userIsAdmin) {
      throw new ServerError('Somente o admin pode gerenciar o grupo!', 400);
    }

    this.groupsRepository.delete(group);
  }
}
