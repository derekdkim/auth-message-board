const Message = require('../models/message');
const debug = require('debug');

const { body, validationResult } = require('express-validator');

// Display all messages
exports.display_messages = function(req, res, next) {
  Message.find()
    .sort({'timestamp': 'ascending'})
    .populate('author')
    .exec(function (err, messages) {
      if (err) { return next(err); }
      // No errors -> render page
      res.render('index', {title: 'Members Only Message Board', messages: messages, user: req.user});
    });
};

// Post new message
exports.post_message = [
  body('newmessage').isString().trim().isLength({ min: 1 }).escape().withMessage('The message cannot be empty.'),
  (req, res) => {
    // Extract validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      // Render the form again with error message
      res.render('index', {title: 'Members Only Message Board', messages: messages, user: req.user, errors: errors.array });
      return;
    } else {
      // Create new message object
      const message = new Message(
        {
          text: req.body.newmessage,
          timestamp: new Date(),
          author: req.user
        }
      );
      message.save(function(err) {
        if (err) { return next(err); }
        res.redirect('back');
      });
    }
  }
];