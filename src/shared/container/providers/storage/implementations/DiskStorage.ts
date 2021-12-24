import { resolve } from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import { IStorageProvider } from '../models/IStorageProvider';

export class DiskStorage implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.directory, file),
      resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.directory, file);
    try {
      await fs.promises.stat(filePath);
    } catch (error) {}

    await fs.promises.unlink(filePath);
  }
}
