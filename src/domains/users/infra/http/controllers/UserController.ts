import { CreateUserService } from '@domains/users/services/user/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, device_id } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password, device_id });

    return res.json(user);
  }
}
