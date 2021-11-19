const { Model, DataTypes, Sequelize} = require('sequelize');
const ws = require('../../socket');

const PULSIMETER_TABLE = 'pulsimeter';

const PulsimeterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  spo2: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  pulso: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha',
    defaultValue: Sequelize.NOW
  }

}

class Pulsimeter extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as:'user',
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
  }
  static config(sequelize){
    return {
      hooks: {
        afterCreate: (pulsimeter) => {
          ws.turnOnPulse(pulsimeter)
        }
      },
      sequelize,
      tableName: PULSIMETER_TABLE,
      modelName: 'Pulsimeter',
      timestamps: false
    }
  }
}

module.exports = {PULSIMETER_TABLE, PulsimeterSchema, Pulsimeter};
