const mongoose= require("mongoose");

const AddDetailsScehma = new mongoose.Schema(
    {
        name: String,
        image: {
            data: Buffer,
            contentType: String,
          },
        description: String,
        category: String,
        price: String,
        diprice: String,
        Quantity: String,
       
    },
    {
        collection:"AddProduct"
    }
);
mongoose.model("AddProduct",AddDetailsScehma);