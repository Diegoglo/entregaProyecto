const boom = require('@hapi/boom');
const db = require("../../db/sequelize");
const { models } = db.sequelize;


class AuxilianteController {

  constructor(){}

  async create(auxiliante) {
    const newAuxiliante = await models.Auxiliante.create({...auxiliante});
    if(!newAuxiliante) {
      throw boom.serverUnavailable('unavailable');
    }
    return newAuxiliante
  }

  async findAll() {
    const auxiliantes = await models.Auxiliante.findAll();
    return auxiliantes
  }

  async findAllByUser(user_id) {
    const auxiliantes = await models.Auxiliante.findAll({
      where: {
        user_id
      }
    });
    return auxiliantes
  }

  async findByEmail(user_id, email) {
    const rta = await models.Auxiliante.findOne({
      where: {
        email,
        user_id
      }
    })
    return rta
  }

  async findByTelefono(user_id, telefono) {
    const rta = await models.Auxiliante.findOne({
      where: {
        telefono,
        user_id
      }
    })
    return rta
  }

  async findOne(id) {
    const auxiliante =  await models.Auxiliante.findByPk(id)
    if(!auxiliante){
      throw boom.notFound('auxiliante not found')
    }
    if(auxiliante.isBlock) {
      throw boom.conflict('auxiliante is blocked');
    }
    return auxiliante
  }

  async update(id, changes) {
    const auxiliante = await models.Auxiliante.findOne(id);
    const rta = await auxiliante.update(changes);
    return rta
  }

  async delete(id) {
    console.log(id);
    // const auxiliante = await models.Auxiliante.findOne(id);
    const auxiliante = await models.Auxiliante.findByPk(id);
    await auxiliante.destroy();
    return {id}
  }
}

 module.exports = AuxilianteController;
