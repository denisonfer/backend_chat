import ICreateGroupDTO from '@domains/groups/dtos/ICreateGroupDTO';
import { IGroupsRepository } from '@domains/groups/repositories/IGroupsRepository';
import { getRepository, Repository } from 'typeorm';
import { Group } from '../entities/Group';

export class GroupsRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async create(groupData: ICreateGroupDTO): Promise<Group> {
    return this.ormRepository.create(groupData);
  }

  public async delete(group: Group): Promise<void> {
    await this.ormRepository.remove(group);
  }

  public async findById(id_group: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({ where: { id: id_group } });

    return group;
  }

  public async save(group: Group): Promise<Group> {
    return this.ormRepository.save(group);
  }
}
