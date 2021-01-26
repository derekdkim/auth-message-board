const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const { body } = require('express-validator');

// GET: Display sign-up form
exports.sign_up_get = function(req, res, next) {
  res.render('sign_up_form', {title: 'Sign Up'});
};

// POST: Post user info for sign up
exports.sign_up_post = function(req, res, next) {
  var new_user = new User(
    {
      username: req.body.username,
      password: req.body.password,
      member_status: false
    }
  );
  // Hash password before saving
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // Replace password with hashed password
    new_user.set('password', hashedPassword);
    // Save user info to DB
    new_user.save(err => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
}

// GET: Display log-in form
exports.log_in_get = function(req, res, next) {
  res.render('log_in_form', {title: 'Log In'});
};

// POST: Post user info for login
exports.log_in_post = function(req, res, next) {
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true });
}