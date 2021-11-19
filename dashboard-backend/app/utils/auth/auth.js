const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const boom = require('@hapi/boom')

const jwtSecret = process.env.JTW_SECRET

const hashPassword = (password) => {

  // if (!password) {
  //   return null
  // }
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
  } catch (error) {
    console.log(error)
    return null
  }
}

const comparePassword = async  (passwordEntered, passwordUserFromDB) => {
  return await bcrypt.compare(passwordEntered, passwordUserFromDB)
}

const issueJWT = (user) => {
    const id = user.id;

    const currentDate = new Date()
    const expirationDate = new Date()
    expirationDate.setDate(currentDate.getDate() + 30)

    const payload = {
      sub: id,
      iat: Math.round(currentDate.getTime() / 1000),
      exp: Math.round(expirationDate.getTime() / 1000)
    }

    const signedToken = jwt.sign(payload, jwtSecret, {
      algorithm: 'HS256'
    })

    // return {
    //   token: signedToken,
    //   expirationDate: expirationDate.toString()
    // }
    return signedToken
}

// const authenticate = (req, res, next) => {

//   let token = req.headers['authorization']
//   if(!token){
//     throw boom.unauthorized()
//   }

//   token = token.replace('Bearer ', '')

//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) {
//       console.error(err)
//       throw boom.unauthorized()
//     } else {
//       req.id = user.sub
//       next()
//     }
//   })
// }

module.exports = {
  hashPassword,
  issueJWT,
  // authenticate,
  comparePassword
}
