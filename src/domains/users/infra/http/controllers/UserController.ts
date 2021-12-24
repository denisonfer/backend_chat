import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@domains/users/services/user/CreateUserService';

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, device_id } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password, device_id });

    return res.json(instanceToInstance(user));
  }
}
