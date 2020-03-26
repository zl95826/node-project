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
    .catch(err=>console.log(err));
}
//getEditProduct: which is responsible for fetching the product that should be edited and for rendering it
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
        product:product
    });})
    .catch(err=>console.log(err));
}

//postEditProduct: which is responsible for saving these changes to the database
exports.postEditProduct=(req,res,next)=>{
    //create update product item
    const id=req.body.productId;
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    const updatedProduct=new Product(title,imageUrl,price,description);
    updatedProduct.updateById(id)
    .then(result=>{
        console.log('Update'); res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
   
}
exports.postDeleteProduct=(req,res,next)=>{
    const id=req.body.productId;
    Product.deleteById(id).then(()=>{console.log('destroy');res.redirect('/admin/products');})
    .catch(err=>console.log(err));
    
}