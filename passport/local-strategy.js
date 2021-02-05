const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.strat = function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.'});
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        // Successful login
        return done(null, user);
      } else {
        // Passwords do not match
        return done(null, false, {msg: 'Incorrect Password'});
      }
    });
  });
}