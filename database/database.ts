/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from "sequelize";
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },

  define: {
    freezeTableName: true,
    timestamps: false,
  },

  timezone: "+05:30",
});

sequelize.sync();

export default sequelize;
