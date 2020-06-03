const express = require('express');
const {check,body}=require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', [check('email').isEmail().withMessage('Please enter a valid email'),body('password',
'Please enter a password with only numbers and text and at least 6 characters.'//error message
).isLength({min:6})],authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;