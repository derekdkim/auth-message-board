const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only Message Board' });
});

/* GET Sign-up form */
router.get('/sign-up', userController.sign_up_get);

module.exports = router;
