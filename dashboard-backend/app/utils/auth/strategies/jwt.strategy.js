const { Strategy, ExtractJwt } = require('passport-jwt');

const jwtSecret = process.env.JTW_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
});

module.exports = JwtStrategy;
