import { getRepository, Repository } from 'typeorm';
import { IGiftsRepository } from '@domains/users/repositories/IGiftsRepository';
import { ICreateGiftDTO } from '@domains/users/dtos/ICreateGiftDTO';
import { Gift } from '../entities/Gift';

export class GiftsRepository implements IGiftsRepository {
  private ormRepository: Repository<Gift>;

  constructor() {
    this.ormRepository = getRepository(Gift);
  }

  public async create({
    id_user,
    gift_1,
    gift_2,
    gift_3,
  }: ICreateGiftDTO): Promise<Gift> {
    return this.ormRepository.create({ id_user, gift_1, gift_2, gift_3 });
  }

  public async findById(id_gift: string): Promise<Gift | undefined> {
    return this.ormRepository.findOne({
      where: {
        id: id_gift,
      },
      relations: ['user'],
    });
  }

  public async findByUser(id_user: string): Promise<Gift | undefined> {
    return this.ormRepository.findOne({
      where: {
        id_user,
      },
      relations: ['user'],
    });
  }

  public async save(gift: Gift): Promise<Gift> {
    return this.ormRepository.save(gift);
  }
}
