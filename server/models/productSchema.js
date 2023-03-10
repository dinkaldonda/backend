const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    diprice:{
        type:String, 
        required:true
    },
    quantity:{
        type:String, 
        required:true
    },
   
   
});


// create model

const product = new mongoose.model("products", productSchema);
module.exports = product;