const { Model, DataTypes, Sequelize} = require('sequelize');
const ws = require('../../socket');

const GSR_TABLE = 'gsr';

const GsrSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  value: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha',
    defaultValue: Sequelize.NOW
  }

}

class Gsr extends Model {
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
        afterCreate: (gsr) => {
          ws.turnOnGsr(gsr)
        }
      },
      sequelize,
      tableName: GSR_TABLE,
      modelName: 'Gsr',
      timestamps: false
    }
  }
}

module.exports = {GSR_TABLE, GsrSchema, Gsr};
