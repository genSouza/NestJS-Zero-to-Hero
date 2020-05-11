import { BaseEntity, PrimaryGeneratedColumn, Column, Entity} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean>{
    const hash = await bcrypt.hash(password, this.salt);
    console.log(hash);
    return hash === this.password;
  }
}