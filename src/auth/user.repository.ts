import { Repository, EntityRepository } from 'typeorm';
import { Users } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new Users();
    user.username = username;
    user.password = password;
    user.uuid = uuidv4();

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
