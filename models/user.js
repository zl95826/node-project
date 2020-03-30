const getDb=require("../util/database").getDb;
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;

class User {
    constructor(username,email,cart,id) {
        this.name=username;
        this.email=email;
        this.cart=cart;//{items:[{...}，{...}]}
        this._id=id;
    }
    save() {
        const db=getDb();
        return db.collection('users').insertOne(this).then(result=>{console.log(result); return result;})
        .catch(err=>{console.log(err)});
    }
    addToCart(product) {
       const cartProductIndex=this.cart.items.findIndex(cp=>cp.productId.toString()===product._id.toString());//different type comparison
       console.log(cartProductIndex);
       let newQuantity=1;
       const updatedCartItems=[...this.cart.items];
       if(cartProductIndex>=0) {
        newQuantity=this.cart.items[cartProductIndex].quantity+1;
        updatedCartItems[cartProductIndex].quantity=newQuantity;
       }else {
        updatedCartItems.push({productId:new ObjectId(product._id),quantity:newQuantity})
       }
       const updatedCart={items:updatedCartItems};
       const db=getDb();
       return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:updatedCart}});
    }
    getCart() {
        const db=getDb();
        const productIds=this.cart.items.map(i=>i.productId);
        return db.collection('products').find({_id:{$in:productIds}}).toArray()
        .then(products=>products.map(
            p=>{
                return {
                    ...p,
                    quantity:this.cart.items.find(i=>i.productId.toString()===p._id.toString()).quantity
                    }
               }
        ));
    }
    deleteItemFromCart(productId) {
        const db=getDb();
        const updatedCartItems=this.cart.items.filter(i=>i.productId.toString()!==productId.toString());
        const updatedCart={items:updatedCartItems};
        return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:updatedCart}});
    }
    addOrder() {
        const db=getDb();
        return this.getCart().then(products=>{
            const order={
                items:products,
                user:{
                    _id:new ObjectId(this._id),
                    name:this.name
                }
            }
            return db.collection('orders').insertOne(order)
        })
        .then(result=>{
            this.cart={items:[]};//After click the Order Now button, it will empty the current cart at this point
            return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}}
            );
        })
    }
    getOrders() {
        const db=getDb();
        return db.collection('orders').find({'user._id':new ObjectId(this._id)}).toArray();
    }
    static findById(userId) {
        const db=getDb();
        return db.collection('users').findOne({_id: new ObjectId(userId)})
        .then(user=> {console.log(user);return user;})
        .catch(err=>{console.log(err)});
    }
}
module.exports=User;