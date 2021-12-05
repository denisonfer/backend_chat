import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@domains/users/providers/HashProvider/models/IHashProviders';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { User } from '@domains/users/infra/typeorm/entities/User';
import { ServerError } from '@shared/error/ServerError';

interface IReqDTO {
  name: string;
  email: string;
  password: string;
  device_id: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    device_id,
  }: IReqDTO): Promise<User> {
    // ? [REGRA]:: Não deve ser capaz de cadastrar um usuário já existente
    const hasUser = await this.usersRepository.findByEmail(email);

    if (hasUser) {
      console.log(
        '[CREATE USER SERVICE] error:: Já existe um usuário com este e-mail',
      );

      throw new ServerError('Já existe um usuário com este e-mail');
    }
    // ? [REGRA]:: Deve ser capaz de criptografar a senha do usuário
    const hashedPassword = await this.hashProvider.createHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      device_id,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
