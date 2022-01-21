import { inject, injectable } from 'tsyringe';

import { IGiftsRepository } from '@domains/users/repositories/IGiftsRepository';
import { Gift } from '@domains/users/infra/typeorm/entities/Gift';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';

@injectable()
export class ShowGiftsOfUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GiftsRepository')
    private giftsRepository: IGiftsRepository,
  ) {}

  public async execute(id_user: string): Promise<Gift> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const gifts = await this.giftsRepository.findByUser(id_user);

    if (!gifts) {
      throw new ServerError('Usuário não cadastrou nenhuma lista de desejo');
    }

    return gifts;
  }
}
