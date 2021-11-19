const express = require('express');
const router = express.Router();

const gsrController = require('./gsr.controller')
const controller = new gsrController();
const  validatorHandler = require('../../middlewares/validatorHandler');
const { createGsrSchema, getGsrSchemaById } = require('../../schemas/gsr.schema');
const { checkApiKey } = require('../../middlewares/authHandler')

router.get('/all',
  checkApiKey,
  async (req, res, next) => {
    try{
      const pulsimeters = await controller.findAll();
      res.status(200).json(pulsimeters)
    }
    catch(err){
      next(err)
    }
  }
);

router.get('/:id',
  checkApiKey,
  validatorHandler(getGsrSchemaById, 'params'),
  async (req,res,next) => {
    const {id} = req.params;
    try{
      const pulsimeter = await controller.findOne(id);
      res.json(pulsimeter)
    }catch(err){
      next(err)
    }
  }
);

router.get('/:userId/between',
  //validador de req.query
  async (req,res,next) => {
    const {initialDate, finalDate} = req.query;
    const {userId} = req.params;
    try{
      const gsrList = await controller.findBetweenDate(userId, initialDate, finalDate);
      res.json(gsrList)
    }catch(err){
      next(err)
    }
  }
);

router.post('/register',
  validatorHandler(createGsrSchema, 'body'),
  async (req, res, next) => {
    try{
      const body = req.body;
      const newPuls = await controller.create(body)
      res.status(201).json(newPuls)
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
      const deletedPuls = await controller.delete(id)
      res.json(deletedPuls)
    }
    catch(err){
      next(err)
    }
  }
);

module.exports = router;
