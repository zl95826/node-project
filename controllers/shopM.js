const Product=require('../models/productM');
exports.getProducts=(req,res,next)=>{
    Product.fetchAll()
    .then(products=>{
        res.render('shop/product-list',{prods:products,pageTitle:'All Products',path:'/products'})
    })
    .catch(err=>err);
}
exports.getIndex=(req,res,next)=>{
    Product.fetchAll()
    .then(products=>{
        res.render('shop/index',{prods:products,pageTitle:'shop',path:'/'})
    })
    .catch(err=>err);
}
exports.getProduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId).then(product=>{
        console.log(product);
        res.render('shop/product-detail',{product,pageTitle:product.title,path:'products'});})
        .catch(err=>err);
}
exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId).then(product=>req.user.addToCart(product)).then(result=>{console.log(result); res.redirect('/cart')}).catch(err=>err);
    //req.user.save();

}
exports.getCart=(req,res,next)=>{
    req.user.getCart().then(products=>{
        res.render('shop/cart',{products,pageTitle:'Your Cart',path:'/cart'});  
    })
    .catch(err=>console.log(err));
}
exports.postCartDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    req.user.deleteItemFromCart(prodId).then(result=>{res.redirect('/cart');})
    .catch(err=>console.log(err));
}
exports.postOrder=(req,res,next)=>{
    req.user.addOrder().then(result=>{
        res.redirect('/orders');  
    })
    .catch(err=>console.log(err));

}
exports.getOrders=(req,res,next)=>{
    req.user.getOrders().then(
        orders=>{
            res.render('shop/orders', {
                path:'/orders',
                pageTitle:'Your Cart',
                orders
            })
        }
    ).catch(err=>console.log(err));
}