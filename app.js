//const http= require('http');//import http module
const express=require('express'); 
const path=require('path');
const bodyParser=require('body-parser');
const expressHbs=require('express-handlebars');//we manually have to tell express that there is such an express handlebars engine available
const app=express();//create an express application and stored it in a constant named app
                    //always running express as a function
//app.engine('hbs',expressHbs(
   // {   layoutsDir:'views/layouts/', //it allows you to set up where my layouts lives, so which folder I can find my layouts
    //    defaultLayout:'main-layout',//define a default layout that should be used for all files
    //    extname: 'hbs'
  //  }
//));//register a new template engine in case we use one which is not build-in. 
   //Express handlebars is not built-in, but pug is,so pug doesn't need this step.
   //the first argument we define a name for our engine                
//app.set('view engine','hbs');
const errorController=require('./controllers/error');
app.set('view engine','ejs');
app.set('views','views');
// let db;无用
//  const mongodb=require('mongodb');//gives us access to the mongodb package
//  const MongoClient=mongodb.MongoClient;

//  const mongoConnect=()=>{
//     //针对下面一行：use the connect method to create a connection to mongodb, return a promise object
//     //  MongoClient.connect('mongodb+srv://bettyMongo:bijd1eIx516mZxYi@cluster0-i8ieo.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
//     // .then(client=>{console.log('connected!');db=client.db("test");db.collection('products').insertOne({movie:'Big Cat'});
//     //client.close();
// })
// //在then这一行参数client：means no errors, we get the connected/(if no existing) newly created | database.方法client.db("test")给db换一个名字，如果不给，默认名字是test。
//     .catch(err=>{console.log(err);throw err;});
//  }
//  mongoConnect();;
const mongoConnect=require('./util/database').mongoConnect;

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const User=require('./models/user');
 app.use(bodyParser.urlencoded({extended:false})); 
 app.use(express.static(path.join(__dirname,'public')));//for loading static assets like images, css
 app.use((req,res,next)=>{
  User.findById('5e7d33f11c9d440000ccb3aa')
  .then(user=>{
  ////here the user is just an object with properties, it's the data directly from the database
  //We cannot use the methods of the User model, so we need to create an instance of User
  req.user=new User(user.name,user.email,user.cart,user._id); console.log(req.user);
  next();
  })//modify the request object and here must have the next()
  .catch(err=>console.log(err));
 
});
 app.use('/admin',adminRoutes);
 app.use(shopRoutes);  
 app.use(errorController.get404);
 //app.listen(3000); 
 
 mongoConnect(()=>{
  app.listen(3000);})            
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