const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
let _db;
//_ underscore means this variable will only be used internally in this file.

const mongoConnect=callback=>{
    //connect method returns a promise
MongoClient.connect(
    'mongodb+srv://bettyMongo:bijd1eIx516mZxYi@cluster0-i8ieo.mongodb.net/shop?retryWrites=true&w=majority'
    )
    .then(client=>{
        console.log('connected!');
        _db=client.db();//db() give us access to the shop database which we automatically connect
        //store a connection to shop database in the _db variable
        callback();
    })
    .catch(err=>{console.log(err);throw err;});
}
const getDb=()=>{
    if(_db) return _db;//return access to that connected database
    throw 'No database found!';
}
//The getDb function is so we can access the database connection from outside of the database.js file.

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;