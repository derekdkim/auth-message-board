const Message = require('../models/message');
const debug = require('debug');

// Display all messages
exports.display_messages = function(req, res, next) {
  Message.find()
    .sort({'timestamp': 'ascending'})
    .exec(function (err, messages) {
      if (err) { return next(err); }
      // No errors -> render page
      res.render('index', {title: 'Members Only Message Board', messages: messages, user: req.user});
    });
};

// Post new message
exports.post_message = function(req, res, next) {
  // Create new message object
  let message = new Message(
    {
      text: req.body.new-message,
      timestamp: new Date(),
      author: req.user
    }
  );
  message.save(function(err) {
    if (err) { return next(err); }
    res.redirect('back');
  });
}