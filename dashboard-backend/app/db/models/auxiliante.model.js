const { Model, DataTypes, Sequelize} = require('sequelize');
//const ws = require('../../socket');

const AUXILIANTE_TABLE = 'auxiliantes';

const AuxilianteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  apellido: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  telefono: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }

}

class Auxiliante extends Model {
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
      tableName: AUXILIANTE_TABLE,
      modelName: 'Auxiliante',
      timestamps: false
    }
  }
}

module.exports = {AUXILIANTE_TABLE, AuxilianteSchema, Auxiliante};
