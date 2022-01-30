import { inject, injectable } from 'tsyringe';

import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { ServerError } from '@shared/error/ServerError';

@injectable()
export class RealizeEventService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(id_group: string): Promise<void> {
    const group = await this.groupsRepository.findById(id_group);

    if (!group) {
      throw new ServerError('Grupo não localizado!', 400);
    }

    if (group.status_group_id === 1) {
      throw new ServerError(
        'O Evento não pode ser realizado antes do sorteio ser realizado!',
        400,
      );
    }

    if (group.status_group_id === 3) {
      throw new ServerError('O Evento já foi realizado!', 400);
    }

    group.status_group_id = 3;

    await this.groupsRepository.save(group);
  }
}
