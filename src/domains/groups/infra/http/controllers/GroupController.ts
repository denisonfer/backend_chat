import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGroupService } from '@domains/groups/services/group/CreateGroupService';
import { ShowGroupsByUserService } from '@domains/groups/services/group/ShowGroupsByUserService';
import { EditGroupService } from '@domains/groups/services/group/EditGroupService';

export class GroupController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showGroupsByUser = container.resolve(ShowGroupsByUserService);

    const groups = await showGroupsByUser.execute(id);

    return res.json(groups);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;
    const {
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    } = req.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute({
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
      id_user,
    });

    return res.json(group);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;
    const { id_group } = req.params;
    const {
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    } = req.body;

    const editGroup = container.resolve(EditGroupService);

    const group = await editGroup.execute({
      id_group,
      id_user,
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    });

    return res.json(group);
  }
}
