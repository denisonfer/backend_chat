import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { getRepository, Repository } from 'typeorm';
import { UsersGroup } from '../entities/UsersGroups';

export class UsersGroupsRepository implements IUsersGroupsRepository {
  private ormRepository: Repository<UsersGroup>;

  constructor() {
    this.ormRepository = getRepository(UsersGroup);
  }

  public async findGroupsByUser(id_user: string): Promise<UsersGroup[]> {
    const groups = await this.ormRepository.find({
      where: { id_user },
      relations: ['group'],
    });

    return groups;
  }

  public async findUsersByGroup(id_group: string): Promise<UsersGroup[]> {
    const participants = await this.ormRepository.find({
      where: { id_group },
      relations: ['user'],
    });

    return participants;
  }

  findGroupToDoRaffle(
    id_group: string,
    id_user: string,
  ): Promise<UsersGroup | undefined> {
    return this.ormRepository.findOne({ where: { id_user, id_group } });
  }

  public async putUserInGroup(
    id_user: string,
    id_group: string,
    isAdmin: boolean,
  ): Promise<UsersGroup> {
    const participants = this.ormRepository.create({
      id_user,
      id_group,
      is_admin: isAdmin,
    });

    return participants;
  }

  public async remove(usersGroup: UsersGroup): Promise<void> {
    this.ormRepository.remove(usersGroup);
  }

  public async save(usersGroup: UsersGroup): Promise<UsersGroup> {
    return this.ormRepository.save(usersGroup);
  }
}
