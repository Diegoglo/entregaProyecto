const boom = require('@hapi/boom');
const db = require("../../db/sequelize");
const { models } = db.sequelize;
const {Op} = require('sequelize');


class PulsimeterController {

  constructor(){}

  async create(puslimeter) {
    const newPulsimeter = await models.Pulsimeter.create({
      ...puslimeter,
    });
    if(!newPulsimeter) {
      throw boom.serverUnavailable('unavailable');
    }
    return newPulsimeter
  }

  async findAll() {
      const pulsimeters = await models.Pulsimeter.findAll();
      return pulsimeters.map((pulsimeter) => {
        //delete pulsimeter.dataValues.createdAt
        return pulsimeter
      })
  }

  async findOne(id) {
    const pulsimeter =  await models.Pulsimeter.findByPk(id)
    if(!pulsimeter){
      throw boom.notFound('user not found')
    }
    // if(user.isBlock) {
    //   throw boom.conflict('user is blocked');
    // }
    return pulsimeter
  }

  async findBetweenDate(userId, initialDate, finalDate){
    const pulsimeters = await models.Pulsimeter.findAll({
      where:{
        user_id: userId,
        fecha: {
          [Op.between]: [initialDate, finalDate]
        }
      }
    })
    if(!pulsimeters){
      throw boom.notFound('pulsimeters not found')
    }
    return pulsimeters
  }

  async delete(id) {
    const pulsimeter = await models.Pulsimeter.findOne(id);
    await pulsimeter.destroy();
    return {id}
  }
}

 module.exports = PulsimeterController;
