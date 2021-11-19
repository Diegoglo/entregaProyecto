const boom = require('@hapi/boom');
const db = require("../../db/sequelize");
const { models } = db.sequelize;
const {Op} = require('sequelize');


class GsrController {

  constructor(){}

  async create(gsr) {
    const newGsr = await models.Gsr.create({
      ...gsr,
    });
    if(!newGsr) {
      throw boom.serverUnavailable('unavailable');
    }
    return newGsr
  }

  async findAll() {
      const gsrList = await models.Gsr.findAll();
      return gsrList.map((pulsimeter) => {
        //delete pulsimeter.dataValues.createdAt
        return pulsimeter
      })
  }

  async findOne(id) {
    const gsr =  await models.Gsr.findByPk(id)
    if(!gsr){
      throw boom.notFound('user not found')
    }
    return gsr
  }

  async findBetweenDate(userId, initialDate, finalDate){
    const gsrList = await models.Gsr.findAll({
      where:{
        user_id: userId,
        fecha: {
          [Op.between]: [initialDate, finalDate]
        }
      }
    })
    if(!gsrList){
      throw boom.notFound('pulsimeters not found')
    }
    return gsrList
  }

  async delete(id) {
    const gsr = await models.Gsr.findOne(id);
    await gsr.destroy();
    return {id}
  }
}

 module.exports = GsrController;
