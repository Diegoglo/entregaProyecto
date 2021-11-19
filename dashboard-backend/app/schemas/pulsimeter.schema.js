const Joi = require('joi')

const id = Joi.number().integer().id();
const fecha = Joi.date();
const spo2 = Joi.number();
const pulso = Joi.number().integer();
const user_id = Joi.number().integer().id();

const createPulsimeterSchema = Joi.object({
  fecha: fecha,
  spo2: spo2.required(),
  pulso: pulso.required(),
  user_id: user_id.required()
})

const getPulsimeterSchemaById = Joi.object({
  id: id.required()
})

module.exports = {
  createPulsimeterSchema,
  getPulsimeterSchemaById

}
