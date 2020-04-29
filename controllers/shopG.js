const Product=require('../models/productMgoose');
const Order=require('../models/order');
exports.getIndex=(req,res,next)=>{
    Product.find()
        .then(products=>{console.log(products);
            res.render('shop/index',{prods:products,pageTitle:'shop',path:'/',isAuthenticated: req.session.isLoggedIn})
        })
        .catch(err=>err);
}
exports.getProducts=(req,res,next)=>{
    Product.find()
    .then(products=>{
        res.render('shop/product-list',{prods:products,pageTitle:'All Products',path:'/products',isAuthenticated: req.session.isLoggedIn})
    })
    .catch(err=>err);
}
exports.getProduct=(req,res,next)=>{
    const id=req.params.productId;
    Product.findById(id)
    //.populate('userId') test
    .then(product=>{console.log('haha');
        console.log(product);
        res.render('shop/product-detail',{product,pageTitle:product.title,path:'products',isAuthenticated: req.session.isLoggedIn});})
        .catch(err=>err);

}
exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId)
    .then(product=>req.user.addToCart(product))
    .then(result=>{console.log(result); res.redirect('/cart')}).catch(err=>err);
    
}
exports.getCart=(req,res,next)=>{
    req.user.populate('cart.items.productId')
    //"cart.items.productId" means select all documents where "productId" is
    // nested in the "items" property of "cart" and populate them.
    //To specify a query condition on fields in an embedded/nested document, use dot notation
    .execPopulate()
    .then(
        user=>{console.log(user,user.cart.items);
            const products=user.cart.items;
            res.render('shop/cart',{products:products,pageTitle:'Your Cart',path:'/cart',isAuthenticated: req.session.isLoggedIn});   
        }
    )
    .catch(err=>console.log(err));
}
exports.postCartDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    req.user.removeFromCart(prodId)
    .then(result=>{res.redirect('/cart');})
    .catch(err=>console.log(err));
}
exports.postOrder=(req,res,next)=>{
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user=>{
        console.log('00000000000000000',user.cart.items);
        const products=user.cart.items.map(i=>{
            console.log(i.productId);
            return {product:{...i.productId._doc},quantity:i.quantity};
    });
    const order=new Order({
        user:{name:req.user.name,
            userId:req.user._id//req.user
        },
        products:products
    });
    order.save();
}).then(result=>{
    return req.user.clearCart();
}).then(()=>{res.redirect('/orders');});   
}

exports.getOrders=(req,res,next)=>{
    Order.find({"user.userId":req.user._id})
    .then(orders=>{
        res.render('shop/orders',{
         path:'/orders',
         pageTitle:'Your Orders',isAuthenticated: req.session.isLoggedIn,
         orders
        })
    })
}