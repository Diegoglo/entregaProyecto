const Joi = require('joi')

const id = Joi.number().integer().id();
const nombre = Joi.string().max(30);
const apellido = Joi.string().max(30);
const email = Joi.string().email();
const sexo = Joi.number().integer().min(0).max(1);
const password = Joi.string().min(6);
const activo = Joi.number().integer().min(0).max(1);

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  sexo: sexo.required(),
  password: password.required(),
  activo: activo
})

const updateUserSchema = Joi.object({
  name: nombre,
  apellido: apellido,
  email: email,
  password: password,
  activo: activo
})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema

}
