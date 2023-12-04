import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  entities: ['dist/modules/**/*.entity.{js,ts}'],
  migrations: ['migrations/*.{js,ts}'],
  synchronize: process.env.NODE_ENV === 'development',
};

export const dataSource = new DataSource(dataSourceOptions);