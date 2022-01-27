import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { JoinUserInGroupService } from '@domains/groups/services/group/JoinUserInGroupService';
import { ShowUsersByGroupService } from '@domains/groups/services/group/ShowUsersByGroupService';

export class UserGroupController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id_group } = req.params;

    const showUsersByGroup = container.resolve(ShowUsersByGroupService);

    const participants = await showUsersByGroup.execute(id_group);

    return res.json(participants);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { code_invite } = req.body;

    const joinUserInGroup = container.resolve(JoinUserInGroupService);

    await joinUserInGroup.execute(id, code_invite);

    return res.status(201).send();
  }
}
