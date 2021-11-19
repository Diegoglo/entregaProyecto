const Joi = require('joi')

const id = Joi.number().integer().id();
const fecha = Joi.date();
const value = Joi.number();
const user_id = Joi.number().integer().id();

const createGsrSchema = Joi.object({
  fecha: fecha,
  value: value.required(),
  user_id: user_id.required()
})

const getGsrSchemaById = Joi.object({
  id: id.required()
})

module.exports = {
  createGsrSchema,
  getGsrSchemaById
}
