const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())
const cors=require("cors");
app.use(cors()); 
const bcrypt  = require("bcryptjs");
app.set("view engine","ejs");
const imageModel = require("./addproduct");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

const JWT_SECRET = "fdghj34567890456789dfghjkmsdfghjkldfghnjftghjklvbnd5t6y7ui" 
const mongoUrl="mongodb+srv://Nisha:nisha123@cluster0.ltrcc2p.mongodb.net/?retryWrites=true&w=majority"

// const multer = require("multer");
// const path = require("path");

mongoose.connect(mongoUrl,{ 
    useNewUrlParser:true,

})
    .then(()=>{console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");





app.post("/register", async(req,res) =>{
        const { name, email, mobile, password, cpassword} = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);
        try{
            const oldUser = await User.findOne({ email });

            if(oldUser){
               return  res.send({error: "user Existed"});
            }
            await User.create({
                name,
                email,
                mobile,
                password: encryptedPassword,
                cpassword:encryptedPassword,
               
            });
            // res.send({ status:"okk" });
            return res.json({status:"Successfully Register!"});
        } 
        catch (error) { 
            // res.send({ status:"error" });
            return res.json({status:"user already exists!"});
        }
    });





app.post("/login-user", async (req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user){
        return res.json({error: "user not found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({}, JWT_SECRET);

        if(res.status(201)){
            return res.json({ status: "Successfully Login", data: token });
        }else{
            // return res.json({ error:"error"});
            return res.json({status:"user already exists!"});
        }
    }
    res.json({ status: "error", error: "Invalid password"});

});

 

app.listen(5001,()=>{
    console.log("server started");
});


app.post("/forgot-password", async(req,res) =>{
    const { email} = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser){
            return res.json({status:"user not exists!"});
        }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret, {
        expiresIn: "5m"
    });
    const link = `http://locathost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'balarnisha1@gmail.com',
          pass: 'yourpassword'
        } 
    })
      
    //   var mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'nisha1@gmail.com',
    //     subject: 'password reset',
    //     text: link,
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
    console.log(link);
    }catch (error){}
});




app.get('/reset-password',async(req,res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser){
        return res.json({status:"user not exists!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        res.render("index", {email:verify.email, status:"Not Verified"});

    }catch (error){
        console.log(error);
        res.send("Not verified");
    }
  
});




app.post('/reset-password/:id/:token',async(req,res) => {
    const { id, token } = req.params;
    const { password } = req.body;
   
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser){
        return res.json({status:"user not exists!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        res.json({ status: "Password Updated "});
        res.render("index", {email:verify.email, status:"varified"});

    }catch (error){
        console.log(error);
        res.json({ status: "somthing went wrong "});
    }
  
});


const upload = multer({ storage: storage });

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





