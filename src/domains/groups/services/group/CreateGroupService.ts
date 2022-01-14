import { Group } from '@domains/groups/infra/typeorm/entities/Group';
import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';
import { isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  name: string;
  date_raffle: Date;
  date_party: Date;
  hour_party: Date;
  locale_party: string;
  value_min: number;
  id_user: string;
}

@injectable()
export class CreateGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) {}

  public async execute({
    name,
    date_raffle,
    date_party,
    hour_party,
    locale_party,
    value_min,
    id_user,
  }: IRequestDTO): Promise<Group> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado!', 400);
    }

    if (isBefore(date_raffle, Date.now())) {
      throw new ServerError(
        'Data do sorteio não pode ser menor que a data atual',
        400,
      );
    }

    if (isBefore(date_party, Date.now())) {
      throw new ServerError(
        'Data do evento não pode ser menor que a data atual',
        400,
      );
    }

    const code_invite = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5)
      .toLocaleUpperCase();

    const groupData = {
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
      code_invite,
    };

    const group = await this.groupsRepository.create(groupData);

    await this.groupsRepository.save(group);

    const id_group = group.id;
    const isAdmin = true;

    const participants = await this.usersGroupsRepository.putUserInGroup(
      id_user,
      id_group,
      isAdmin,
    );

    await this.usersGroupsRepository.save(participants);

    return group;
  }
}
