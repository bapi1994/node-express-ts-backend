module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "demo_nodejs_backend",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
