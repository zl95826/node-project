const getDb=require('../util/database').getDb;
const mongodb=require('mongodb');
//call this function to get access to my database and therefore I can use it to interact with the database.
class Product{
    constructor(title,imageUrl,price,description) {
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;  
     }
     save() {
        const db= getDb();//getDb does simply return that database instance we connected to
        //so now we have a database connection which allows us to interact with the database
        //the next level is a collection
        //So here we can connect to any collection and just as with the database, if it doesn't exist yet, 
        //it will be created the first time you insert data.
        //So here connect to a products collection: db.collection('products')
        //Now on that collection, we can execute a couple of mongodb commands or operations.
        return db.collection('products')
        .insertOne(this)//thus is the newly created object
        .then(result=>{console.log(result)})
        .catch(err=>{console.log(err)});
     }
     static fetchAll() {
        const db= getDb();
        return db.collection('products')
                .find()
                .toArray()
                .then(products=>{console.log(products);return products;})
                .catch(err=>{console.log(err)});
     }
     static findById(prodId) {
        const db=getDb();
        return db.collection('products')
                .find({_id:mongodb.ObjectId(prodId)}).next().then(product=>{console.log(product);return product;}).catch(err=>{console.log(err)});
     }
}
module.exports=Product;