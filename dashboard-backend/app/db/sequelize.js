const dbConfig = require("../config/db.config");
const { Sequelize } = require("sequelize");
const setupModels = require('./models/')
require('dotenv').config()

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.dbUserName, dbConfig.dbPassword, {
  logging: false,
  host: dbConfig.dbHost,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min
  }
});
setupModels(sequelize);


sequelize.sync({force: true})
.then(() => null)
.catch((err) => console.log(err))


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.connect = async function() {
  try {
    await this.sequelize.authenticate();
    console.log('SQL database connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the SQL database:', error);
    }
}

module.exports = db;
