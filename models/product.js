const products=[];
module.exports=class Product {
    constructor(t) {
       this.title=t; 
    }
    save() {
        products.push(this);//this refers to the object created based on the class
    }
    static fetchAll() {
        return products;
    }
}