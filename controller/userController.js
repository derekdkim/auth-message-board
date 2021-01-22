const User = require('../models/user');

const { body } = require('express-validator');

// GET: Display Sign up form
exports.sign_up_get = function(req, res, next) {
  res.render('sign_up_form', {title: 'Sign Up'});
};

// POST: Post user info for sign up
exports.sign_up_post = function(req, res, next) {
  var new_user = new User(
    {
      first_name: req.body.first-name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password
    }
  );
  // Set up bcrypt for password match, hashing
  new_user.save(function(err) {
    if (err) { return next(err); }
    redirect('/');
  });
}

// POST: Post user info for login
exports.log_in_post = function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true });
}