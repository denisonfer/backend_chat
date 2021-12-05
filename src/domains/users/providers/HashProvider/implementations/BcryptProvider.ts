import bcrypt from 'bcryptjs';
import { IHashProvider } from '../models/IHashProviders';

export class BcryptProvider implements IHashProvider {
  public async createHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 8);

    return hashedPassword;
  }

  public async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isEqual = await bcrypt.compare(password, hashedPassword);

    return isEqual;
  }
}
