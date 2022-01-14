import { User } from '@domains/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './Group';

@Entity('users_groups')
export class UsersGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.usersGroup)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  id_user: string;

  @Column()
  is_admin: boolean;

  @ManyToOne(() => Group, group => group.usersGroup)
  @JoinColumn({ name: 'id_group' })
  group: Group;

  @Column()
  id_group: string;

  @ManyToOne(() => User, user => user.usersGroup)
  @JoinColumn({ name: 'id_user' })
  userRaffled: User;

  @Column()
  user_raffled: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
