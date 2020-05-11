import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  uuid: string;
}
