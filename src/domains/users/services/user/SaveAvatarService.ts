import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@domains/users/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/storage/models/IStorageProvider';
import { User } from '@domains/users/infra/typeorm/entities/User';
import { ServerError } from '@shared/error/ServerError';
import upload from '@config/upload';

@injectable()
export class SaveAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(userId: string, filename: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ServerError('Usuário não localizado', 401);
    }

    if (user.avatar) {
      if (upload.driver === 'firebaseStorage') {
        const avatar_url = user.avatar;

        const stringSplitted = avatar_url
          .split(
            'https://storage.googleapis.com/download/storage/v1/b/tireitu-62815.appspot.com/o/',
          )
          .pop();
        const [imageId] = stringSplitted!.split('?generation');

        await this.storageProvider.deleteFile(imageId);
      } else {
        await this.storageProvider.deleteFile(user.avatar);
      }
    }

    const file = await this.storageProvider.saveFile(filename);

    user.avatar = file;

    await this.usersRepository.save(user);

    return user;
  }
}
