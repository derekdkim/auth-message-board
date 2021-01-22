var Message = require('../models/message');

// Display all messages
exports.display_message = function(req, res, next) {
  Message.find()
    .sort({'timestamp', 'ascending'})
    .exec(function (err, messages) {
      if (err) { return next(err); }

      res.render('index', {title: 'Members Only Message Board', messages: messages});
    });
};