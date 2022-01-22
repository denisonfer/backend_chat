import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@domains/users/services/user/CreateUserService';
import { EditProfileService } from '@domains/users/services/user/EditProfileService';

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, device_id } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password, device_id });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { name, email } = req.body;

    const editProfile = container.resolve(EditProfileService);

    const user = await editProfile.execute({ id_user: id, name, email });

    return res.json(instanceToInstance(user));
  }
}
