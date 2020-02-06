//const http= require('http');//import http module
const express=require('express'); 
const path=require('path');
const bodyParser=require('body-parser');
const expressHbs=require('express-handlebars');//we manually have to tell express that there is such an express handlebars engine available
const app=express();//create an express application and stored it in a constant named app
                    //always running express as a function
app.engine('hbs',expressHbs(
    {   layoutsDir:'views/layouts/', //it allows you to set up where my layouts lives, so which folder I can find my layouts
        defaultLayout:'main-layout',//define a default layout that should be used for all files
        extname: 'hbs'
    }
));//register a new template engine in case we use one which is not build-in. 
   //Express handlebars is not built-in, but pug is,so pug doesn't need this step.
   //the first argument we define a name for our engine                
app.set('view engine','hbs');
app.set('views','views');
// let db;
// const mongodb=require('mongodb');
// const MongoClient=mongodb.MongoClient;
// const mongoConnect=()=>{
//     MongoClient.connect('mongodb+srv://bettyMongo:bijd1eIx516mZxYi@cluster0-i8ieo.mongodb.net/test?retryWrites=true&w=majority')
//     .then(client=>{console.log('connected!');db=client.db();db.collection('products').insertOne({book:'red'});})
//     .catch(err=>{console.log(err);throw err;});
// }
// mongoConnect();;

const adminData=require('./routes/admin');
const shopRoutes=require('./routes/shop');
 app.use(bodyParser.urlencoded({extended:false})); 
 app.use(express.static(path.join(__dirname,'public')));//for loading static assets like images, css
 app.use('/admin',adminData.routes);
 app.use(shopRoutes);  
 app.use((req,res,next)=>{
     //res.status(404).sendFile(path.join(__dirname,'views','404.html'))
     res.status(404).render('404',{pageTitle:'Page Not Found'});
 })
 app.listen(3000);             
//app.get('/favicon.ico', (req, res) => res.status(204));
    // app.use('/',(req,res,next)=>{
    //     console.log('Runs!');//This always runs
    //     next();
    // });
// app.use('/add-product',(req,res,next)=>{
//     console.log('In the middleware');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    //action attribute=the path/the url, to which the requests should be sent
   // res.write('<h1>Product Page</h1>');next();//Without next(), the request can't continue its journey, so it will never reach a place 
    //where we might send a response, so use the method send
//});//use method allows us to add a middleware function
//you pass a function to app.use, the function will be executed for every incoming request
//and this function will receive three arguments,the request object, response object, and next
//next is a function. It has to be executed to allow the request to travel on to the next middleware in line.

//we need a route or a middleware that handles requests to product(the data submitted in add-product was sent to product page)
//app.use('/product',(req,res,next)=>{
// app.post('/product',(req,res,next)=>{
//     console.log(req.body);//request gives us the body property but by default, request doesn't try to parse the incoming request body
//     //we need to register a parser and we do that by adding another middleware.
//     res.redirect('/');
// });//using use, the middleware always executes not just for post requests but also for get requests
//So here we change use to post to limit middleware execution only for post requests

// app.use('/',(req,res,next)=>{
//     res.send('<h1>Hello from /</h1>');
// });
//const server=http.createServer(app);
//the app here actually happens to be a valid request handler, so you can pass app to createServer.
//So it sets up a certain way of handling incoming requests.
//server.listen(3000);
//app.listen(3000);
//express shorten the code: const server=http.createServer(app);server.listen(3000);