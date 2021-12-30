import { injectable, inject } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import { ServerError } from '@shared/error/ServerError';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IRecoveryPassMailTokensRepository } from '@domains/users/repositories/IRecoveryPassMailTokensRepository';
import { IHashProvider } from '@domains/users/providers/HashProvider/models/IHashProviders';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
export class RecoveryPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RecoveryPassMailTokensRepository')
    private recoveryPassMailTokensRepository: IRecoveryPassMailTokensRepository,
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.recoveryPassMailTokensRepository.findToken(
      token,
    );

    if (!userToken) {
      throw new ServerError('Token de email inexistente', 400);
    }

    const user = await this.usersRepository.findById(userToken.id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const dateCreatedToken = userToken.created_at;
    const compareDate = addHours(dateCreatedToken, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new ServerError('Token expirado');
    }

    user.password = await this.hashProvider.createHash(password);

    await this.usersRepository.save(user);
  }
}
