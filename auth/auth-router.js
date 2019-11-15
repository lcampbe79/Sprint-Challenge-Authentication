const bcrypt = require('bcryptjs');

const router = require('express').Router();

const jwt = require('jsonwebtoken');

const Users = require('../auth/auth-model');

router.post('/register', (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({message: 'Sorry, please enter required information'})
    return
  } 

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(error).json(error)
    })
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}! Please take this token...`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

module.exports = router;

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const secret = process.env.JWT_SECRET || 'secrets are fun'
  const options = {
    expiresIn:'1d'
  }
  return jwt.sign(payload, secret, options)
}
