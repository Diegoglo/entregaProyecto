const boom = require('@hapi/boom');
const db = require("../../db/sequelize");
const { models } = db.sequelize;
const auth = require('../../utils/auth/auth');


class UserController {

  constructor(){}

  async create(user) {
    const hash = auth.hashPassword(user.password);
    const newUser = await models.User.create({
      ...user,
      password: hash
    });
    if(!newUser) {
      throw boom.serverUnavailable('unavailable');
    }
    delete newUser.dataValues.password;
    return newUser
  }

  async findAll() {
      const users = await models.User.findAll();
      return users.map((user) => {
        delete user.dataValues.password
        delete user.dataValues.createdAt
        return user
      })
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: {
        email
      }
    })
    return rta
  }

  async findOne(id) {
    const user =  await models.User.findByPk(id)
    if(!user){
      throw boom.notFound('user not found')
    }
    if(user.isBlock) {
      throw boom.conflict('user is blocked');
    }
    return user
  }

  async update(id, changes) {
    const user = await models.User.findOne(id);
    const rta = await user.update(changes);
    return rta
  }

  async delete(id) {
    const user = await models.User.findOne(id);
    await user.destroy();
    return {id}
  }
}

 module.exports = UserController;
