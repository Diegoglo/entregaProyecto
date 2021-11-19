require('dotenv').config();

module.exports = {
  dbHost: process.env.DB_HOST,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  pool: {
    max: 5,
    min: 0
  }
}
