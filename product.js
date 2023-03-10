const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())
const cors=require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const imageModel = require("./addproduct");

const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 

const mongoUrl="mongodb+srv://Nisha:nisha123@cluster0.ltrcc2p.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,

})
    .then(()=>{console.log("connected to database");
})
.catch((e)=>console.log(e));

// require("./addproduct");
// const User = mongoose.model("AddProduct");


// product_route.use(express.static('public'));


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
  const upload = multer({ storage: storage });
  
//   app.post("/", upload.single("testImage"), (req, res) => {
//     const saveImage = new  imageModel({
//       name: req.body.name,
//       image: {
//         data: fs.readFileSync("uploads/" + req.file.filename),
//         contentType: "image/png",
//       },
//       description:req.body. description,
//       category : req.body.category,
//       price :req.body.price,
//       diprice :req.body.diprice,
//       Quantity:req.body.Quantity,

//     });
//     saveImage.save()
//       .then(() => {
//         console.log("image is saved");
//         res.send('image is saved');
//       })
//       .catch((err) => {
//         console.log(err, "error has occurred");
//         res.status(500).send('error has occurred while saving image');
//       });
//   });
  
  
//   app.get('/',  async (req,res)=>{
//     const allData = await imageModel.find()
//     res.json(allData)
//   })

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

app.post("/product", upload.single("testImage"), async(req,res) =>{
    const { name, image, description, category, price, diprice, Quantity} = req.body;
        await User.create({
            name,
            image: {
                data: fs.readFileSync("uploads/" + req.file.filename),
                contentType: "image/png",
              },
            description,
            category,
            price,
            diprice,
            Quantity,

        });
         res.send({ status:"okk" });
        // return res.json({status:"Successfully Register!"});
    } 
   
);

app.listen(5000,()=>{
    console.log("server started");
});
