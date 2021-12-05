import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UsersAuthenticationService } from '@domains/users/services/user/UserAuthenticationService';

export class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userAuthenticated = container.resolve(UsersAuthenticationService);

    const { user, token } = await userAuthenticated.execute(email, password);

    return res.json({ user, token });
  }
}
