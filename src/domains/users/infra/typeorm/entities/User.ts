import upload from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

      /*   case 'firebaseStorage':
        return `${process.env.APP_API_URL}/files/${this.avatar}`; */

      default:
        return null;
    }
  }
}
