const bcrypt = require('bcryptjs');

const router = require('express').Router();

const jwt = require('jsonwebtoken');

const Users = require('../auth/auth-model');

router.post('/register', (req, res) => {
  let user = req.body;

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
  // implement login
});

module.exports = router;


