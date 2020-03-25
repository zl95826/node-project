const Product=require('../models/productM');
exports.getAddProduct=(req,res,next)=>{
    res.render('admin/edit-product',{pageTitle:'Add Product',path:'/admin/add-product', editing:false, activeAddProduct:true,formsCSS:true,productCSS:true})};

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    const product=new Product(title,imageUrl,price,description);
    product.save()
    .then(result=>{
        console.log('Created Product');
        res.redirect('/');
    });
}
exports.getProducts=(req,res,next)=>{
    Product.fetchAll()
    .then(products=>{
        res.render('admin/products',{prods:products,pageTitle:'All Products',path:'/admin/products'})
    })
    .catch(err=>err);
}