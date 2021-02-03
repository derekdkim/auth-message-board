const User = require('../models/user');

const user = {
  serialize: (user, done) => {
    done(null, user.id)
  },
  deserialize: (id, done) => {
    User.findById(id, function(err, user) {
    done(err, user);
  });
  }
}

module.exports = user;