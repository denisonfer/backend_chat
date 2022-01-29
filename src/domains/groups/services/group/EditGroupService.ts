import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { Group } from '@domains/groups/infra/typeorm/entities/Group';
import { ServerError } from '@shared/error/ServerError';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';

interface IRequestDTO {
  id_group: string;
  id_user: string;
  name?: string;
  date_raffle?: Date;
  date_party?: Date;
  hour_party?: Date;
  locale_party?: string;
  value_min?: number;
}

@injectable()
export class EditGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) {}

  public async execute({
    id_group,
    id_user,
    name,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
  }: IRequestDTO): Promise<Group> {
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

    if (name) {
      group.name = name;
    }

    if (date_raffle) {
      if (isBefore(date_raffle, Date.now())) {
        throw new ServerError(
          'Data do sorteio não pode ser menor que a data atual',
          400,
        );
      }

      group.date_raffle = date_raffle;
    }

    if (date_party) {
      if (isBefore(date_party, Date.now())) {
        throw new ServerError(
          'Data da festa não pode ser menor que a data atual',
          400,
        );
      }

      group.date_party = date_party;
    }

    if (hour_party) {
      group.hour_party = hour_party;
    }

    if (locale_party) {
      group.locale_party = locale_party;
    }

    if (value_min) {
      group.value_min = value_min;
    }

    await this.groupsRepository.save(group);

    return group;
  }
}
