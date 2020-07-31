const Product=require('../models/productMgoose');
exports.getAddProduct=(req,res,next)=>{
    res.render('admin/edit-product',{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        isAuthenticated: req.session.isLoggedIn, 
        editing:false, activeAddProduct:true,formsCSS:true,productCSS:true})};

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    //const imageUrl=req.body.image;
    const imageUrl=req.file;
    const price=req.body.price;
    const description=req.body.description;
    console.log(imageUrl);
    const product=new Product({title:title,imageUrl:imageUrl,price:price,description:description,userId:req.user});
    //req.user is the entire user object, not just the id and mongoose will pick the id from that object
    product.save()
    .then(result=>{
        console.log('Created Product');
        res.redirect('/admin/products');
    });
}
exports.getProducts=(req,res,next)=>{
    Product.find()
    .then(products=>{
        res.render('admin/products',{prods:products,pageTitle:'All Products',path:'/admin/products',isAuthenticated: req.session.isLoggedIn})
    })
    .catch(err=>err);
}
exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    if(!editMode) {return res.redirect('/');}
    const prodId=req.params.productId;
    Product.findById(prodId).then(product=>{if(!product) {
        return res.redirect('/');
    }
    res.render('admin/edit-product',{
        pageTitle:'Edit Product',
        path:'/admin/edit-product',
        editing:editMode,
        product:product,
        isAuthenticated: req.session.isLoggedIn
    });})
    .catch(err=>console.log(err));
}
exports.postEditProduct=(req,res,next)=>{
    //create update product item
    const id=req.body.productId;
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    Product.findById(id)
    .then(product=>{
        product.title=title;
        product.imageUrl=imageUrl;
        product.price=price;
        product.description=description;
        return product.save();//if we call save on an existing object, it will not be saved as a new one but the changes will be saved
    })
    .then(result=>{
        console.log('Update'); res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
   
}
exports.postDeleteProduct=(req,res,next)=>{
    const id=req.body.productId;
    Product.findByIdAndRemove(id).then(()=>{console.log('destroy');res.redirect('/admin/products');})
    .catch(err=>console.log(err));
    
}