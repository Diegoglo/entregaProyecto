const configDB = require('./db.config')


const USER = encodeURIComponent(configDB.dbUserName);
const PASSWORD = encodeURIComponent(configDB.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${configDB.dbHost}:${configDB.dbPort}/${configDB.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  }
}

// module.exports = {
//   development: {
//     username: configDB.dbUserName,
//     password: configDB.dbPassword,
//     database: configDB.dbName,
//     host: configDB.dbHost,
//     dialect: 'postgres',
//   },
//   production: {
//     username: configDB.dbUserName,
//     password: configDB.dbPassword,
//     database: configDB.dbName,
//     host: configDB.dbHost,
//     dialect: 'postgres',
//   }
// }
