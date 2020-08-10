module.exports = {
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/server/modules/**/*.entity.js'],
  migrationsTableName: 'migration_table',
  migrations: ['dist/migration/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: true,
  cli: {
    migrationsDir: 'migration'
  }
};
