import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGroupService } from '@domains/groups/services/group/CreateGroupService';

export class GroupController {
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
}
