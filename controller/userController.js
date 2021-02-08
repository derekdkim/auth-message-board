const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const debug = require('debug');

const { body, validationResult } = require('express-validator');

// GET: Display sign-up form
exports.sign_up_get = function(req, res, next) {
  res.render('sign_up_form');
};

// POST: Post user info for sign up
exports.sign_up_post = [
  body('username').trim().isString().isLength({ min: 6 }).escape().withMessage('Username must be at least 6 characters')
    .isAlphanumeric().withMessage('Username can only consist of alphanumeric characters'),
  body('password').trim().isString().isLength({ min: 1 }).escape().withMessage('Password must not be empty.'),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign_up_form');
      return;
    } else {
      const new_user = new User(
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
  }
];

// GET: Display log-in form
exports.log_in_get = function(req, res, next) {
  res.render('log_in_form', {title: 'Log In'});
};

// POST: Post user info for login
exports.log_in_post = passport.authenticate('local', {
  session: true,
  successRedirect: "/",
  failureRedirect: "/login"
});

// GET: Membership form
exports.membership_form_get = function(req, res, next) {
  res.render('membership_form', {user: req.user});
}

// POST: Submit membership test
exports.membership_form_post = function(req, res, next) {
  if (req.user && req.user !== undefined) {
    const TRUE_ANSWER = 4;
    if (parseInt(req.body.answer, 10) === TRUE_ANSWER) {
      console.log('Correct answer! Registering as user now.');
      console.log(req.params.id);
      console.log(req.user._id);

      User.findByIdAndUpdate(req.user._id, { member_status: true }, { new: true }, function(err, result) {
        if (err) {
          return next(err);
        } else {
          console.log(result);
          res.redirect('/');
        }
      });
    } else {
      // Incorrect answer
      console.log('Wrong answer');
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }
}

// GET: Log-out
exports.log_out = function(req, res, next) {
  req.logout();
  res.redirect('/');
};