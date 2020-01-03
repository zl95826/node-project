//const http= require('http');//import http module
const express=require('express'); 
const app=express();//create an express application and stored it in a constant named app
                    //always running express as a function
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/',(req,res,next)=>{
    console.log('Runs!');
    next();
});
app.use('/add-product',(req,res,next)=>{
    console.log('In the middleware');
    res.send('<h1>Product Page</h1>');
   // res.write('<h1>Product Page</h1>');next();//Without next(), the request can't continue its journey, so it will never reach a place 
    //where we might send a response
});//use method allows us to add a middleware function
//you pass a function to app.use, the function will be executed for every incoming request
//and this function will receive three arguments,the request object, response object, and next
//next is a function. It has to be executed to allow the request to travel on to the next middleware in line.
app.use('/',(req,res,next)=>{
    console.log('In Another middleware');
    res.send('<h1>Hello from /</h1>');
});
//const server=http.createServer(app);
//the app here actually happens to be a valid request handler, so you can pass app to createServer.
//So it sets up a certain way of handling incoming requests.
//server.listen(3000);
app.listen(3000);
//express shorten the code: const server=http.createServer(app);server.listen(3000);