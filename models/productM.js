const getDb=require('../util/database').getDb;
//call this function to get access to my database and therefore I can use it to interact with the database.
class Product{
    constructor(title,imageUrl,price,description) {
        this.title=title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;    
     }
}
module.exports=Product;