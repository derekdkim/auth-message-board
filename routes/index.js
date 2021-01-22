const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const indexController = require('../controller/indexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only Message Board' });
});

/* POST New Message */
router.post('/', indexController.post_message);

/* GET Sign up form */
router.get('/sign-up', userController.sign_up_get);

/* POST Sign up form */
router.post('/sign-up', userController.sign_up_post);

/* GET Login form */
router.get('/log-in', userController.log_in_get);

/* POST Login form */
router.post('/log-in', userController.log_in_post);

module.exports = router;