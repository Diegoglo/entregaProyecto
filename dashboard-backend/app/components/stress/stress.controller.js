const boom = require('@hapi/boom');
const db = require("../../db/sequelize");
const { models } = db.sequelize;
const auth = require('../../utils/auth/auth');
const { sendMail } = require('../../utils/mailer/nodeMailer');

class StressController {

  constructor(){}

  async sendEmail(subject, message, emailContacto){
    return await sendMail(subject, message, emailContacto);
  }
}

module.exports = StressController;
