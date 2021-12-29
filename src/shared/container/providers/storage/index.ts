import { container } from 'tsyringe';

import upload from '@config/upload';
import { DiskStorage } from './implementations/DiskStorage';
import { FirebaseStorage } from './implementations/FirebaseStorage';
import { IStorageProvider } from './models/IStorageProvider';

const provider = {
  diskLocal: DiskStorage,
  firebaseStorage: FirebaseStorage,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  provider[upload.driver],
);
