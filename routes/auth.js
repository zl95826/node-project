const express = require('express');
const {check,body}=require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();
const User=require('../models/userG');
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', [check('email').isEmail().withMessage('Please enter a valid email').custom((val,{req})=>{
return  User.findOne({email:val}).then(userDoc=>{
    if(userDoc) {
        return Promise.reject('E-Mail exists already, please pick a different one.');
    }
})
}),
body('password','Please enter a password with only numbers and text and at least 6 characters.'//error message
).isLength({min:6}).withMessage('Password at least 6 characters.').isAlphanumeric(),
body('confirmPassword').custom((value,{req})=>{
    if(value!==req.body.password) {throw new Error('Passwords have to match!')}
    return true;
})],authController.postSignup);
//body() same as check(), but only checking req.body
router.post('/logout', authController.postLogout);

module.exports = router;