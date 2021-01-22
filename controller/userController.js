var User = require('../models/user');

// GET: Display Sign up form
exports.sign_up_get = function(req, res, next) {
  res.render('sign_up_form', {title: 'Sign Up'});
};