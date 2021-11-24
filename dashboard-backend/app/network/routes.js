const express = require('express')
const user = require('../components/user/user.routes');
const auth = require('../components/auth/auth.routes');
const gsr = require('../components/gsr/gsr.routes');
const pulsimeter = require('../components/pulsimeter/pulsimeter.routes');
const auxiliante = require('../components/auxiliante/auxiliante.routes');



const routes = function (server) {
    const router = express.Router()
    server.use('/api', router);
    router.use('/users', user);
    router.use('/auth', auth);
    router.use('/gsr', gsr);
    router.use('/pulsimeter', pulsimeter);
    router.use('/auxiliante', auxiliante);
}

module.exports = routes;
