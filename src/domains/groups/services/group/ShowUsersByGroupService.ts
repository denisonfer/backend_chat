import { UsersGroup } from '@domains/groups/infra/typeorm/entities/UsersGroups';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ShowUsersByGroupService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,
  ) {}

  public async execute(id_group: string): Promise<UsersGroup[]> {
    const participants = await this.usersGroupsRepository.findUsersByGroup(
      id_group,
    );

    return participants;
  }
}
