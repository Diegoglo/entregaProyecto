'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');
const {GsrSchema, GSR_TABLE} = require('../models/gsr.model');
const {PulsimeterSchema, PULSIMETER_TABLE} = require('../models/pulsimeter.model');
const { StressSchema, STRESS_TABLE} = require('../models/stress.model')

module.exports = {
  up: async (queryInterface, ) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(GSR_TABLE, GsrSchema);
    await queryInterface.createTable(PULSIMETER_TABLE, PulsimeterSchema);
    await queryInterface.createTable(STRESS_TABLE, StressSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(GSR_TABLE);
    await queryInterface.dropTable(PULSIMETER_TABLE);
    await queryInterface.dropTable(STRESS_TABLE);
  }
};
