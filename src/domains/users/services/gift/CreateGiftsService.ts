import { inject, injectable } from 'tsyringe';

import { Gift } from '@domains/users/infra/typeorm/entities/Gift';
import { IGiftsRepository } from '@domains/users/repositories/IGiftsRepository';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';

interface IRequestDTO {
  id_user: string;
  gift_1: string;
  gift_2: string;
  gift_3: string;
}

@injectable()
export class CreateGiftsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GiftsRepository')
    private giftsRepository: IGiftsRepository,
  ) {}

  public async execute({
    id_user,
    gift_1,
    gift_2,
    gift_3,
  }: IRequestDTO): Promise<Gift> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const gifts = await this.giftsRepository.create({
      id_user,
      gift_1,
      gift_2,
      gift_3,
    });

    await this.giftsRepository.save(gifts);

    return gifts;
  }
}
