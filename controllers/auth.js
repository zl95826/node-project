const User=require('../models/userG');
const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator');
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = 'SG.U-secret';
sgMail.setApiKey(SENDGRID_API_KEY);

exports.getLogin=(req,res,next)=>{
        let message=req.flash('error');
        if(message.length>0) {message=message[0];}
        else {message=null;}
        res.render('auth/login',{
         path:'/login',
         pageTitle:'Login',
         errorMessage:message,
        isAuthenticated:false
        })
    
}
exports.getSignup=(req,res,next)=>{
        let message=req.flash('error');
        if(message.length>0) {message=message[0];}
        else {message=null;}
        res.render('auth/signup',{
         path:'/signup',
         pageTitle:'Signup',
         errorMessage:message,
        isAuthenticated:false
        })
}

exports.postLogin=(req,res,next)=>{
        const email=req.body.email;
        const password=req.body.password;
        User.findOne({email:email})
        .then(user=>{
                if(!user) {//this the email doesn't exist
                req.flash('error', 'Invalid email');//arguments in flash 第一个是key/property
                   return  res.redirect('/login');  //this is a new request, we don't know that we got here because the user entered an invalid email or anything. When we trigger this new request,
                   //this is treated in the same way as a request that was triggered by clicking on the login button
                }
                bcrypt.compare(password,user.password)
                .then(doMatch=>{
                        if(doMatch) {
                                req.session.isLoggedIn=true;
                                req.session.user=user;
                                return   res.redirect('/');
                                //req.session.save(err=>{ res.redirect('/'); });
                        }
                        req.flash('error', 'Invalid Password');
                        res.redirect('/login');
                        
                })
                .catch(err=>{console.log(err);res.redirect('/login');});
                
        })
        .catch(err => console.log(err));

}
exports.postSignup=(req,res,next)=>{
        const email=req.body.email;
        const password=req.body.password;
        const confirmPassword=req.body.confirmPassword;
        const errors=validationResult(req);//validationResult will be a function that allows us to gather all the errors in a req object
        if(!errors.isEmpty()) {console.log('error object', errors.array());
                return res.status(422).render('auth/signup',{
                        path:'/signup',
                        pageTitle:'Signup',
                        errorMessage:errors.array()[0].msg,//because withMessage() in auth.js, feedback is changed
                       isAuthenticated:false
                       });
        }
        
                bcrypt.hash(password,12)//return a promise object 
                       .then(hashedPassword=>{
                        const user=new User({
                                email:email,
                                password:hashedPassword,
                                cart:{items:[]}      
                               });
                               return user.save();    
                })
                .then(result=>{ res.redirect('/login');
                        const msg = {
                                to: 'bettybear2@gmail.com',
                                from: 'zl95826@hotmail.com',  //use the email you used to signup to sendgrid
                                subject: 'Sending with Twilio SendGrid is Fun',
                                text: 'and easy to do anywhere, even with Node.js'+result.email,
                                html: '<strong>and easy to do anywhere, even with Node.js</strong> '+result.email
                              };
                           
                              sgMail.send(msg).then(() => {}, error => {
                                console.log(error);
                             
                                if (error.response) {
                                  console.log(error.response.body)
                                }
                              });     
                        
                       })
        
}

exports.postLogout = (req, res, next) => {
        req.session.destroy(err => {
          console.log(err);
          res.redirect('/');
        });
      };
      