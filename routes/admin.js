//const http= require('http');//import http module
const express=require('express'); 
//const path=require('path');
//const rootDir=require('../util/path');
const router=express.Router();
//const adminController=require('../controllers/admin');
const adminController=require('../controllers/adminM');
// /admin/add-product => GET

router.get('/add-product',adminController.getAddProduct
   //res.sendFile(path.join(rootDir,'views','add-product.html'));
   // res.write('<h1>Product Page</h1>');next();//Without next(), the request can't continue its journey, so it will never reach a place 
    //where we might send a response, so use the method send
);//use method allows us to add a middleware function
//you pass a function to app.use, the function will be executed for every incoming request
//and this function will receive three arguments,the request object, response object, and next
//next is a function. It has to be executed to allow the request to travel on to the next middleware in line.

//we need a route or a middleware that handles requests to product(the data submitted in add-product was sent to product page)
//app.use('/product',(req,res,next)=>{

// /admin/add-product => POST
router.post('/add-product',adminController.postAddProduct
// (req,res,next)=>{
//     console.log(req.body);//request gives us the body property but by default, request doesn't try to parse the incoming request body
//     //we need to register a parser and we do that by adding another middleware.
//     products.push({title:req.body.title});console.log(products);
//     res.redirect('/');}
);//using use, the middleware always executes not just for post requests but also for get requests
//So here we change use to post to limit middleware execution only for post requests

// exports.routes=router;
// exports.products=products;

 router.get('/products',adminController.getProducts);
// router.get('/edit-product/:productId',adminController.getEditProduct);
// router.post('/edit-product',adminController.postEditProduct);
// router.post('/delete-product',adminController.postDeleteProduct);
module.exports=router;