import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root123',
  database: 'TaskManagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
