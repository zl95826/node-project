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
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',//ref takes a string, tell mongoose hey which other mongoose model is actually related to the data in that field.
        required:true
    }

})
//create a schema object
module.exports=mongoose.model('products',productSchema);