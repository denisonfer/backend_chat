import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { User } from '@domains/users/infra/typeorm/entities/User';
import { IHashProvider } from '@domains/users/providers/HashProvider/models/IHashProviders';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';
import { authConfig } from '@config/authConfig';

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
export class UsersAuthenticationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(email: string, password: string): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ServerError('E-mail ou senha inválido', 401);
    }

    const passwordIsEqual = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordIsEqual) {
      throw new ServerError('E-mail ou senha inválido', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}
