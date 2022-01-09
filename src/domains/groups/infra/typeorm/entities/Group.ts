import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusGroup } from './StautsGroup';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
