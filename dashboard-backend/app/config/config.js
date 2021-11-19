require('dotenv').config();

const config = {
  host: process.env.HOST || 'http://localhost',
  appPort: process.env.APP_PORT || 3000,
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE || 'files',
  apiKey: process.env.API_KEY
};

module.exports = config;
