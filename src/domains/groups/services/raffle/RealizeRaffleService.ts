import { inject, injectable } from 'tsyringe';

import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';

@injectable()
export class RealizeRaffleService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(id_user: string, id_group: string): Promise<void> {
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

    if (group.status_group_id !== 1) {
      throw new ServerError('Sorteio já foi realizado!', 400);
    }

    if (group.members_qtd < 3) {
      throw new ServerError(
        'Grupo deve ter pelo menos 3 participantes para realizar o sorteio',
        400,
      );
    }

    const participants = usersByGroup
      .map(userInGroup => userInGroup.id_user)
      .sort();

    // Embaralha os participants
    let index_current = participants.length;
    let value_temp;
    let index_random;
    while (index_current !== 0) {
      index_random = Math.floor(Math.random() * index_current);
      index_current -= 1;
      value_temp = participants[index_current];
      participants[index_current] = participants[index_random];
      participants[index_random] = value_temp;
    }

    // Sorteio
    participants.forEach(async (user_id, index) => {
      const last_user = participants[participants.length - 1];

      const groupToDoRaffle =
        await this.usersGroupsRepository.findGroupToDoRaffle(id_group, user_id);

      if (!groupToDoRaffle) {
        throw new ServerError('Dado de grupo não encontrado', 400);
      }

      switch (user_id === last_user) {
        case false:
          groupToDoRaffle.user_raffled = participants[index + 1];

          break;

        default:
          groupToDoRaffle.user_raffled = participants[0];

          break;
      }

      await this.usersGroupsRepository.save(groupToDoRaffle);
    });

    group.status_group_id = 2;

    await this.groupsRepository.save(group);
  }
}
