const { User, UserSchema } = require('./user.model');
const { Gsr, GsrSchema } = require('./gsr.model');
const { Pulsimeter, PulsimeterSchema } = require('./pulsimeter.model')
const { Stress, StressSchema } = require('./stress.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Gsr.init(GsrSchema, Gsr.config(sequelize));
  Pulsimeter.init(PulsimeterSchema, Pulsimeter.config(sequelize));
  Stress.init(StressSchema, Stress.config(sequelize));

  User.associate(sequelize.models);
  Gsr.associate(sequelize.models);
  Pulsimeter.associate(sequelize.models);
  Stress.associate(sequelize.models);
}

module.exports = setupModels
