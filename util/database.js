const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
const mongoConnect=callback=>{
    //connect method returns a promise
MongoClient.connect(
    'mongodb+srv://bettyMongo:bijd1eIx516mZxYi@cluster0-i8ieo.mongodb.net/test?retryWrites=true&w=majority'
    )
    .then(client=>{
        console.log('connected!');
        callback(client);
    })
    .catch(err=>console.log(err));
}

module.exports=mongoConnect;