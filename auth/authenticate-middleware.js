const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

  const token = req.headers.authorization

  if (token) {
    const secret = process.env._JWT_SECRET || 'secrets are fun'

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(403).json({message: 'Invalid Credentials'})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
