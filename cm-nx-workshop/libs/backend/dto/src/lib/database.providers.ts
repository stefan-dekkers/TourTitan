import { UserEntity } from './../../../features/src/lib/user/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'TourTitans',
        entities: [UserEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
