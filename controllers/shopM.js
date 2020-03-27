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
    
}