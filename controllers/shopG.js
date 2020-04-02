const Product=require('../models/productMgoose');
exports.getIndex=(req,res,next)=>{
    Product.find()
        .then(products=>{console.log(products);
            res.render('shop/index',{prods:products,pageTitle:'shop',path:'/'})
        })
        .catch(err=>err);
}
exports.getProducts=(req,res,next)=>{
    Product.find()
    .then(products=>{
        res.render('shop/product-list',{prods:products,pageTitle:'All Products',path:'/products'})
    })
    .catch(err=>err);
}
exports.getProduct=(req,res,next)=>{
    const id=req.params.productId;
    Product.findById(id)
    .then(product=>{
        console.log(product);
        res.render('shop/product-detail',{product,pageTitle:product.title,path:'products'});})
        .catch(err=>err);

}