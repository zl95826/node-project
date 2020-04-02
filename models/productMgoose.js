const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    title:{
        type:String,//set type
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }

})
//create a schema object
module.exports=mongoose.model('products',productSchema);