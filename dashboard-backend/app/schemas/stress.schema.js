const Joi = require('joi')

const id = Joi.number().integer().id();
const fecha = Joi.date();
const value = Joi.number().integer();

const createStressSchema = Joi.object({
  fecha: fecha.required(),
  spo2: value.required(),
})

const updateStressSchema = Joi.object({
  fecha: fecha,
  value: value,
})

const getStressSchemaById = Joi.object({
  id: id.required()
})

module.exports = {
  createStressSchema,
  updateStressSchema,
  getStressSchemaById
}
