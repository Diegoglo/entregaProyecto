const express = require('express');
const passport = require('passport');
const { issueJWT } = require('../../utils/auth/auth')


const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      delete user.dataValues.createdAt
      const token = issueJWT(user);
      res.json({user, token});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
