const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema (
  {
    first_name: {type: String, required: true, maxlength: 20},
    last_name: {type: String, required: true, maxlength: 20},
    username: {type: String, required: true, minlength: 6, maxlength: 16},
    password: {type: String, required: true, minlength: 8, maxlength: 22},
    member_status: {type: Boolean, default: false}
  }
);

// Virtual for full name
UserSchema
  .virtual('name')
  .get(function() {
    return this.first_name + ' ' + this.last_name;
  });

// Virtual for user account URL
UserSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id;
  });

// Export model
module.exports = mongoose.model('User', UserSchema);