import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { JoinUserInGroupService } from '@domains/groups/services/group/JoinUserInGroupService';

export class UserGroupController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { code_invite } = req.body;

    const joinUserInGroup = container.resolve(JoinUserInGroupService);

    await joinUserInGroup.execute(id, code_invite);

    return res.status(201).send();
  }
}
