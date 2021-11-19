const express = require('express');
const router = express.Router();
//const { checkApiKey } = require('../../middlewares/authHandler')

const UserController = require('./user.controller')
const controller = new UserController();
const  validatorHandler = require('../../middlewares/validatorHandler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../../schemas/user.schema')

router.get('/all',
  //checkApiKey,
  async (req, res, next) => {
    try{
      const users = await controller.findAll();
      res.status(200).json(users)
    }
    catch(err){
      next(err)
    }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
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

router.post('/register',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newUser = await controller.create(body)
      res.status(201).json(newUser)
    }
    catch(err){
      next(err)
    }
  }
);

router.patch('/:id/personal-data',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
