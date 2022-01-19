import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusGroup } from './StatusGroup';
import { UsersGroup } from './UsersGroups';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('timestamp with time zone')
  date_raffle: Date;

  @Column('timestamp with time zone')
  date_party: Date;

  @Column('timestamp with time zone')
  hour_party: Date;

  @Column()
  locale_party: string;

  @Column('decimal')
  value_min: number;

  @Column()
  status_group_id: number;

  @OneToOne(() => StatusGroup)
  @JoinColumn({ name: 'status_group_id' })
  status_group: StatusGroup;

  @Column()
  code_invite: string;

  @Column('int')
  members_qtd: number;

  @OneToMany(() => UsersGroup, usersGroup => usersGroup.group)
  usersGroup: UsersGroup[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
