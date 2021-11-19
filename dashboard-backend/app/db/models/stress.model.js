const { Model, DataTypes, Sequelize} = require('sequelize');

const STRESS_TABLE = 'stress';

const StressSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  stress_value: {
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

class Stress extends Model {
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
      sequelize,
      tableName: STRESS_TABLE,
      modelName: 'Stress',
      timestamps: false
    }
  }
}

module.exports = {STRESS_TABLE, StressSchema, Stress};
