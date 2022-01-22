import { inject, injectable } from 'tsyringe';

import { User } from '@domains/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { ServerError } from '@shared/error/ServerError';

interface IRequestDTO {
  id_user: string;
  name?: string;
  email?: string;
}

@injectable()
export class EditProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id_user, name, email }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(id_user);

    if (!user) {
      throw new ServerError('Usuário não localizado', 400);
    }

    if (email) {
      const userWithEmail = await this.usersRepository.findByEmail(email);

      if (userWithEmail && userWithEmail.id !== user.id) {
        throw new ServerError('E-mail já em uso', 400);
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
