export interface IHashProvider {
  createHash(password: string): Promise<string>;
  compareHash(password: string, hashedPassword: string): Promise<boolean>;
}
