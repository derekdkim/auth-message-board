const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema (
  {
    text: {type: String, required: true, maxlength: 500},
    timestamp: {type: Date, required: true, default: Date.now },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);

MessageSchema
  .virtual('fTimestamp')
  .get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString({ hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric', year: 'numeric' });
  });

// Export model
module.exports = mongoose.model('Message', MessageSchema);