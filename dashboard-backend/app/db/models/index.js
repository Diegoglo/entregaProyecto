const { User, UserSchema } = require('./user.model');
const { Gsr, GsrSchema } = require('./gsr.model');
const { Pulsimeter, PulsimeterSchema } = require('./pulsimeter.model')
const { Stress, StressSchema } = require('./stress.model');
const { Auxiliante, AuxilianteSchema } = require('./auxiliante.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Gsr.init(GsrSchema, Gsr.config(sequelize));
  Pulsimeter.init(PulsimeterSchema, Pulsimeter.config(sequelize));
  Stress.init(StressSchema, Stress.config(sequelize));
  Auxiliante.init(AuxilianteSchema, Auxiliante.config(sequelize));

  User.associate(sequelize.models);
  Gsr.associate(sequelize.models);
  Pulsimeter.associate(sequelize.models);
  Stress.associate(sequelize.models);
  Auxiliante.associate(sequelize.models);
}

module.exports = setupModels
