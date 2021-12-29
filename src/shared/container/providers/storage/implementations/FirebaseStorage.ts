/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'path';
import mime from 'mime';
import { uuid } from 'uuidv4';

import upload from '@config/upload';
import { ServerError } from '@shared/error/ServerError';
import { IStorageProvider } from '../models/IStorageProvider';

const admin = require('firebase-admin');
const serviceAccount = require('@config/firebase-key');

export class FirebaseStorage implements IStorageProvider {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originaPath = resolve(upload.directory, file);
    const contentType = mime.getType(originaPath);

    if (!contentType) {
      throw new ServerError('Arquivo não localizado!');
    }

    const storageRef = admin
      .storage()
      .bucket(upload.config.firebaseStorage.bucket);

    const storage = await storageRef.upload(originaPath, {
      public: true,
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
    });

    return storage[0].metadata.mediaLink;
  }

  public async deleteFile(file: string): Promise<void> {
    await admin
      .storage()
      .bucket(upload.config.firebaseStorage.bucket)
      .file(file)
      .delete();
  }
}
