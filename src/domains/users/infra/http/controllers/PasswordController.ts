import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RecoveryPasswordService } from '@domains/users/services/password/RecoveryPasswordService';
import SendEmailForgotPasswordService from '@domains/users/services/password/SendEmailForgotPasswordService';

class PasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmailForgotPassword = container.resolve(
      SendEmailForgotPasswordService,
    );

    await sendEmailForgotPassword.execute({
      email,
    });

    return res.status(204).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPassword = container.resolve(RecoveryPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return res.status(204).send();
  }
}

export default PasswordController;
