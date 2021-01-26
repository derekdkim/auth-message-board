const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema (
  {
    username: {type: String, required: true, minlength: 6},
    password: {type: String, required: true},
    member_status: {type: Boolean, default: false}
  }
);

// Virtual for user account URL
UserSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id;
  });

// Export model
module.exports = mongoose.model('User', UserSchema);