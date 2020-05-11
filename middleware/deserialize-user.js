const User = require('../models/user');

const deserializeUser = (req, res, next) => {
  // console.log('Im inside deserialized user');
  // console.log('response.session: ', req.session);
  const userId = req.session.userId;
  if (userId) {
    User.findById({ _id: userId })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
};

module.exports = deserializeUser;
