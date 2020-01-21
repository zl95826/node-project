const path=require('path');
const express=require('express'); 
const router=express.Router();
const rootDir=require('../util/path');
const adminData=require('./admin');
router.get('/',(req,res,next)=>{
    console.log('shop.js',adminData.products);
    res.sendFile(path.join(rootDir,'views','shop.html'));
    //res.sendFile(path.join(__dirname,'..','views','shop.html'));//don't add slashes before the folder name like /views
    ////res.sendFile(path.join(__dirname,'../','views','shop.html'));
});
//__dirname gives us the path to a folder in which contains the currently executing file. 
//Now we're using it in the shop.js in the routes folder
//so this will point to the routes folder.
//  ../ and this simply means go up one level
module.exports=router;
