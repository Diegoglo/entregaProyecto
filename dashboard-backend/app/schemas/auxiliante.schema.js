const Joi = require('joi')

const id = Joi.number().integer().id();
const nombre = Joi.string().max(30);
const apellido = Joi.string().max(30);
const email = Joi.string().email();
const telefono = Joi.string();
const user_id = Joi.number().integer().id();

const createAuxilianteSchema = Joi.object({
  user_id: user_id.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  telefono: telefono.required()
})

const updateAuxilianteSchema = Joi.object({
  name: nombre,
  apellido: apellido,
  email: email,
  telefono: telefono
})

const getAuxilianteSchema = Joi.object({
  id: id.required()
})

const getAuxilianteByUserIDSchema = Joi.object({
  user_id: user_id.required()
})

const getAuxilianteByTelefonoSchema = Joi.object({
  telefono: telefono.required()
})

const getAuxilianteByEmailSchema = Joi.object({
  email: email.required()
})

module.exports = {
  createAuxilianteSchema,
  updateAuxilianteSchema,
  getAuxilianteByUserIDSchema,
  getAuxilianteByTelefonoSchema,
  getAuxilianteByEmailSchema,
  getAuxilianteSchema
}
