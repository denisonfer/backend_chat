import { UsersGroup } from '@domains/groups/infra/typeorm/entities/UsersGroups';
import { IUsersGroupsRepository } from '@domains/groups/repositories/IUsersGroupsRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ShowGroupsByUserService {
  constructor(
    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<UsersGroup[]> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const groups = await this.usersGroupsRepository.findGroupsByUser(user.id);

    return groups;
  }
}
