import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { SaveAvatarService } from '@domains/users/services/user/SaveAvatarService';

export class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;
    const { userId } = req.params;

    const saveAvatar = container.resolve(SaveAvatarService);

    const user = await saveAvatar.execute(userId, filename);

    return res.json(instanceToInstance(user));
  }
}
