const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const authenticationRouter = express.Router();

authenticationRouter.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

authenticationRouter.post('/sign-up', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (password.length < 10) {
    //next(new Error("Password needs to be at least 10 characters long"))
    res.render('sign-up', { error: 'Password not long enough' });
    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hashAndSalt) => {
      return User.create({
        username,
        password: hashAndSalt
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch((err) => {
      // console.log('Error on sin-up posting method', err);
      next(err);
    });
});

authenticationRouter.get('/log-in', (req, res) => {
  res.render('log-in');
});

authenticationRouter.post('/log-in', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let auxUser;

  User.findOne({ username })
    .then((userDocument) => {
      auxUser = userDocument;
      return bcrypt.compare(password, auxUser.password);
    })
    .then((comparison) => {
      if (comparison) {
        req.session.userId = auxUser._id; // Serialize the user. Save user information in database and access it, by ID, every time some information is needed.
        res.redirect('/');
        // res.render('profile');
        // console.log('Log-in success');
      } else {
        // console.log('Comparison failure');
        res.redirect('/log-in');
      }
    })
    .catch((err) => {
      console.log('log-in post error', err);
      res.redirect('/log-in');
    });
});

module.exports = authenticationRouter;
