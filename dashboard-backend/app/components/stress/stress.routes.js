const express = require('express');
const router = express.Router();
const passport = require('passport');
//const { checkApiKey } = require('../../middlewares/authHandler')

const StressController = require('./stress.controller')
const controller = new StressController();

router.post('/mail',
  async (req, res, next) => {
    try{
      const { subject, message, emailContacto } = req.body;
      const mailInfo = await controller.sendEmail(subject, message, emailContacto);
      res.status(201).json(mailInfo)
    }
    catch(err){
      next(err)
    }
  }
)

module.exports = router;
