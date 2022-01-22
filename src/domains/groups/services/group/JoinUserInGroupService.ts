import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { ServerError } from '@shared/error/ServerError';

@injectable()
export class JoinUserInGroupService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) {}

  public async execute(id_user: string, code_invite: string): Promise<void> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const group = await this.groupsRepository.findByCodeInvite(
      code_invite.toLocaleUpperCase(),
    );

    if (!group) {
      throw new ServerError('Código inválido ou inexistente', 400);
    }

    const groupOfUser = await this.usersGroupsRepository.findGroupsByUser(
      id_user,
    );

    const checkUserInGroup = groupOfUser.find(
      groupData =>
        groupData.id_user === user.id &&
        groupData.group.code_invite === group.code_invite,
    );

    if (checkUserInGroup) {
      throw new ServerError('Usuário já faz parte do grupo', 400);
    } else {
      const userInGroup = await this.usersGroupsRepository.putUserInGroup(
        id_user,
        group.id,
        false,
      );

      await this.usersGroupsRepository.save(userInGroup);
    }
  }
}
