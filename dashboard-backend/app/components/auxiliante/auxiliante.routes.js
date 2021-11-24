const express = require('express');
const router = express.Router();
const passport = require('passport');
//const { checkApiKey } = require('../../middlewares/authHandler')

const AuxilianteController = require('./auxiliante.controller')
const controller = new AuxilianteController();
const  validatorHandler = require('../../middlewares/validatorHandler');
const { createAuxilianteSchema,
        updateAuxilianteSchema,
        getAuxilianteByUserIDSchema,
        getAuxilianteByEmailSchema,
        getAuxilianteByTelefonoSchema,
        getAuxilianteSchema
      } = require('../../schemas/auxiliante.schema')

router.get('/all',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try{
      const users = await controller.findAll();
      res.status(200).json(users)
    }
    catch(err){
      next(err)
    }
});

router.get('/:user_id/all',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    const {user_id} = req.params;
    try{
      const users = await controller.findAllByUser(user_id);
      res.status(200).json(users)
    }
    catch(err){
      next(err)
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getAuxilianteSchema, 'params'),
  async (req,res,next) => {
    const {id} = req.params;
    try{
      const user = await controller.findOne(id);
      res.json(user)
    }catch(err){
      next(err)
    }
  }
);

router.get('/:user_id/byEmail',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getAuxilianteByUserIDSchema, 'params'),
  validatorHandler(getAuxilianteByEmailSchema, 'query'),
  async (req,res,next) => {
    const {user_id} = req.params;
    const {email} = req.query;
    try{
      const user = await controller.findOne(user_id, email);
      res.json(user)
    }catch(err){
      next(err)
    }
  }
);

router.get('/:user_id/byTelefono',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getAuxilianteByUserIDSchema, 'params'),
  validatorHandler(getAuxilianteByTelefonoSchema, 'query'),
  async (req,res,next) => {
    const {user_id} = req.params;
    const {telefono} = req.query;
    try{
      const user = await controller.findOne(user_id, telefono);
      res.json(user)
    }catch(err){
      next(err)
    }
  }
);

router.post('/register',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createAuxilianteSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newAuxiliante = await controller.create(body)
      res.status(201).json(newAuxiliante)
    }
    catch(err){
      next(err)
    }
  }
);

router.patch('/:id/personal-data',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getAuxilianteByUserIDSchema, 'params'),
  validatorHandler(updateAuxilianteSchema, 'body'),
  async (req, res, next) => {
    try{
      const {id} = req.params
      const body = req.body
      const changedUser = await controller.update(id, body);
      res.status(200).json(changedUser)
    }
    catch(err){
      next(err)
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try{
      const {id} = req.params
      const deletedUser = await controller.delete(id)
      res.json(deletedUser)
    }
    catch(err){
      next(err)
    }
  }
);

module.exports = router;
