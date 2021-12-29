import { Repository, getRepository } from 'typeorm';

import { IRecoveryPassMailTokensRepository } from '@domains/users/repositories/IRecoveryPassMailTokensRepository';
import { RecoveryPassMailToken } from '../entities/RecoveryPassMailToken';

export class RecoveryPassMailTokensRepository
  implements IRecoveryPassMailTokensRepository
{
  private ormRepository: Repository<RecoveryPassMailToken>;

  constructor() {
    this.ormRepository = getRepository(RecoveryPassMailToken);
  }

  public async createToken(id_user: string): Promise<RecoveryPassMailToken> {
    const token = this.ormRepository.create({
      id_user,
    });

    await this.ormRepository.save(token);

    return token;
  }

  public async findToken(
    token: string,
  ): Promise<RecoveryPassMailToken | undefined> {
    const tokenUser = await this.ormRepository.findOne({
      where: { token },
    });

    return tokenUser;
  }
}
