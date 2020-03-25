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