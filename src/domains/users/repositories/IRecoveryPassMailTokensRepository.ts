import { RecoveryPassMailToken } from '../infra/typeorm/entities/RecoveryPassMailToken';

export interface IRecoveryPassMailTokensRepository {
  createToken(id_user: string): Promise<RecoveryPassMailToken>;
  findToken(token: string): Promise<RecoveryPassMailToken | undefined>;
}
