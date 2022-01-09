import ICreateGroupDTO from '../dtos/ICreateGroupDTO';
import { Group } from '../infra/typeorm/entities/Group';

export interface IGroupsRepository {
  create(groupData: ICreateGroupDTO): Promise<Group>;
  delete(group: Group): Promise<void>;
  findById(id_group: string): Promise<Group | undefined>;
  save(group: Group): Promise<Group>;
}
