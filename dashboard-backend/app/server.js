
class Server {

  main () {

    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    const ws = require('./socket')

    const cors = require('cors');
    const dotenv = require('dotenv');
    dotenv.config();
    const config = require('./config/config');
    const port = parseInt(config.appPort);
    const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler');
      //const { checkApiKey } = require('./middlewares/authHandler');


    // const whitelist = []
    // const options = {
    //   origin: (origin, callback) => {
    //     if (whitelist.includes(origin)) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error('no permitido'));
    //     }
    //   }
    // }


    const passport = require('passport');
    app.use(passport.initialize());
    require('./utils/auth/index'); //inicializa las estrategias de passport

    const db = require('./db/sequelize')
    const router = require('./network/routes')

    app.use(express.static(__dirname + '/public')); //servicio del HTML
    app.use(cors());
    app.use(express.json());

    //conexion socket
    ws.connect(server);

    //conexion de router y db
    db.connect()
    router(app)

    //Middlewares
      //app.use(checkApiKey);
    app.use(logErrors);
    app.use(ormErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler);

    server.listen(port,() => {
      console.log(`Running in PORT: ${port}`)
    })
  }
}

module.exports = Server
