const bcrypt = require('bcrypt');
// const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: hash
    });
    console.log(user);
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          role: fetchedUser.role
        },
        'My_Very_Educated_Mother_Just_Served_Us_Noodles',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        username: fetchedUser.username,
        role: fetchedUser.role
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
});

router.get('/', (req, res) => {
  User.find().then((documents) => {
    res.status(200).json(documents);
  });
});

module.exports = router;
