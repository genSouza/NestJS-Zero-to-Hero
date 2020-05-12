import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Users } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column({ unique: true })
  uuid: string;

  @ManyToOne(
    type => Users,
    user => user.tasks,
    { eager: false },
  )
  user: Users;

  @Column()
  userId: number;
}
