const path=require('path');
const express=require('express'); 
const router=express.Router();
//const rootDir=require('../util/path');
//const adminData=require('./admin');
//const shopController=require('../controllers/shopM');
const shopController=require('../controllers/shopG');
router.get('/',shopController.getIndex
//layout a special key that is understood by handlebars and it would not use the default layout if set it to false
//you cannot set the layout:true, otherwise error happens
);
    //this is provided by expressjs and it will use the default templating engine and then return that template
    //If we use pug as the templating engine, it will look for .pug files, here shop.pug a templating file, the first argument is the template
    //We can add second argument to the render method to pass in data, it must be an object where
    //we map it(=the data) to a key name which we then can use in the template to refer to the data we're passing in
    //console.log('shop.js',adminData.products);
    //res.sendFile(path.join(rootDir,'views','shop.html'));
    //res.sendFile(path.join(__dirname,'..','views','shop.html'));//don't add slashes before the folder name like /views
    ////res.sendFile(path.join(__dirname,'../','views','shop.html'));

//__dirname gives us the path to a folder in which contains the currently executing file. 
//Now we're using it in the shop.js in the routes folder
//so this will point to the routes folder.
//  ../ and this simply means go up one level
 router.get('/products',shopController.getProducts);
 router.get('/products/:productId', shopController.getProduct);
// router.get('/cart',shopController.getCart);
// router.post('/cart',shopController.postCart);
// router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// router.post('/create-order',shopController.postOrder);
// router.get('/orders',shopController.getOrders);
module.exports=router;
