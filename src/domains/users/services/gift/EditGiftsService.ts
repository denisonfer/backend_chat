import { inject, injectable } from 'tsyringe';

import { IGiftsRepository } from '@domains/users/repositories/IGiftsRepository';
import { Gift } from '@domains/users/infra/typeorm/entities/Gift';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';

interface IRequestDTO {
  id_user: string;
  id_gift: string;
  gift_1?: string;
  gift_2?: string;
  gift_3?: string;
}

@injectable()
export class EditGiftsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GiftsRepository')
    private giftsRepository: IGiftsRepository,
  ) {}

  public async execute({
    id_user,
    id_gift,
    gift_1,
    gift_2,
    gift_3,
  }: IRequestDTO): Promise<Gift> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    const gifts = await this.giftsRepository.findById(id_gift);

    if (!gifts) {
      throw new ServerError('Lista de presentes não localizada', 400);
    }

    if (gift_1) {
      gifts.gift_1 = gift_1;
    }
    if (gift_2) {
      gifts.gift_2 = gift_2;
    }
    if (gift_3) {
      gifts.gift_3 = gift_3;
    }

    await this.giftsRepository.save(gifts);

    return gifts;
  }
}
