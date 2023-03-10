const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  description : String,
  category : String,
  price : String,
  diprice: String ,    
  Quantity: String,

  
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);