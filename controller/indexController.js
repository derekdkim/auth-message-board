const Message = require('../models/message');

// Display all messages
exports.display_message = function(req, res, next) {
  Message.find()
    .sort({'timestamp': 'ascending'})
    .exec(function (err, messages) {
      if (err) { return next(err); }

      res.render('index', {title: 'Members Only Message Board', messages: messages});
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