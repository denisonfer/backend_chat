import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import upload from '@config/upload';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  avatar: string;

  @Column()
  device_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar' })
  getAvatar(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (upload.driver) {
      case 'diskLocal':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;

      case 'firebaseStorage':
        return `${this.avatar}`;

      default:
        return null;
    }
  }
}
