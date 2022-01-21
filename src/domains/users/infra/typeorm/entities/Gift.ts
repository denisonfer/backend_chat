import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('gifts')
export class Gift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_user: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  gift_1: string;

  @Column()
  gift_2: string;

  @Column()
  gift_3: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
