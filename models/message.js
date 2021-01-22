const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema (
  {
    text: {type: String, required: true, maxlength: 500},
    timestamp: {type: Date, required: true, default: Date.now },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);

// Export model
module.exports = mongoose.model('Message', MessageSchema);