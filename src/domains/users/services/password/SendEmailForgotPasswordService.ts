import { injectable, inject } from 'tsyringe';
import { resolve } from 'path';

import { IMailProvider } from '@shared/container/providers/mail/models/IMailProvider';
import { ServerError } from '@shared/error/ServerError';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IRecoveryPassMailTokensRepository } from '@domains/users/repositories/IRecoveryPassMailTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
export default class SendEmailForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('RecoveryPassMailTokensRepository')
    private recoveryPassMailTokensRepository: IRecoveryPassMailTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ServerError('Usuário não localizado!', 400);
    }

    const { token } = await this.recoveryPassMailTokensRepository.createToken(
      user.id,
    );

    const templateForgotPassword = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[TireiTu] Recuperação de senha',
      templateData: {
        file: templateForgotPassword,
        variables: {
          name: user.name,
          link: `http://localhost:3000/resetar-senha/?token=${token}`,
        },
      },
    });
  }
}
