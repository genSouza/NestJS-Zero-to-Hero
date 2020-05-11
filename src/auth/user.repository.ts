import { Repository, EntityRepository } from 'typeorm';
import { Users } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

     const user = new Users();
    user.salt = await bcrypt.genSalt();
    user.username = username;
    user.password = await this.hashPassword(password, user.salt);
    user.uuid = uuidv4();

    try {
      await user.save();
      console.log(user.password);
    } catch (error) {
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
