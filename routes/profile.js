const express = require('express');
const User = require('../models/user');
const routeValidation = require('../middleware/route-validation');

const profileRouter = express.Router();

profileRouter.get('/', routeValidation, (req, res, next) => {
  res.render('profile/profile');
});

profileRouter.get('/edit', routeValidation, (req, res, next) => {
  res.render('profile/edit-profile');
});

module.exports = profileRouter;
