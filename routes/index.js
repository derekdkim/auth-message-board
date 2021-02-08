const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const indexController = require('../controller/indexController');

/* GET home page. */
router.get('/', indexController.display_messages);

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

/* GET Log out */
router.get('/log-out', userController.log_out);

/* GET Membership form */
router.get('/become-a-member', userController.membership_form_get);

/* POST Membership form */
router.post('/become-a-member', userController.membership_form_post);

/* POST New Message */
router.post('/', indexController.post_message);

module.exports = router;