export const databaseConfig: IDatabaseConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT) || 5432,
  name: process.env.DB_NAME || 'apidatabase',
  host: process.env.DB_HOST || 'localhost',
  type: process.env.DB_TYPE || 'postgres'
};

interface IDatabaseConfig {
  user: string;
  password: string;
  port: number;
  name: string;
  host: string;
  type: any;
}
