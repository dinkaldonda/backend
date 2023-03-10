const express = require("express");
const admindb = require("../models/AdminSchema");
const router = new express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const jwt  = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fs = require("fs");
const product = require("../models/productSchema")
const imageModel = require("../models/model");
const keysecret = "nisharydswbkdbejfgdejdhsdnskjbc";
// router.use(cors());
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());


// email config

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"balarnisha1@gmail.com",
//         pass:"1234567"
//     }
// }) 


// for user registration

router.post("/register", async (req, res) => {

    // console.log (req.body);
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });

            // here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});



// // user Login

router.post("/login", async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                // console.log(token);
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }
        else{
            res.status(401).json({status:401,message:"invalid details"});
        }

    } catch (error) {
        res.status(401).json({status:401,error});
        console.log("catch block");
    }
});



// // user valid
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// // user logout

// // router.get("/logout",authenticate,async(req,res)=>{
// //     try {
// //         req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
// //             return curelem.token !== req.token
// //         });

// //         res.clearCookie("usercookie",{path:"/"});

// //         req.rootUser.save();

// //         res.status(201).json({status:201})

// //     } catch (error) {
// //         res.status(401).json({status:401,error})
// //     }
// // });



// // send email Link For reset Password


// router.post("/sendpasswordlink ",async(req,res)=>{
//     console.log(req.body)
//  const {email} = req.body;

//     if(!email){
//         res.status(401).json({status:401,message:"Enter Your Email"})
//     }

//     try {
//         const userfind = await userdb.findOne({email:email});

//         console.log("userfind",userfind);
//         // token generate for reset password
//         const token = jwt.sign({_id:userfind._id},keysecret,{
//             expiresIn:"120s"
//         });
//         // console.log("token",token)
        
//         const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
//         // console.log("setusertoken",setusertoken)

//         if(setusertoken){
//             const mailOptions = {
//                 from:"balarnisha1@gmail.com",
//                 to:email,
//                 subject:"Sending Email For password Reset",
//                 text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
//             }

//             transporter.sendMail(mailOptions,(error,info)=>{
//                 if(error){
//                     console.log("error",error);
//                     res.status(401).json({status:401,message:"email not send"})
//                 }else{
//                     console.log("Email sent",info.response);
//                     res.status(201).json({status:201,message:"Email sent Succsfully"})
//                 }
//             })

//         }

//     } catch (error) {
//         res.status(401).json({status:401,message:"invalid user"})
//     }
   

// });




    
// // change password

router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

router.get("/getAllUser", async(req, res) => {
    try{
       const AllUser = await userdb.find({});
       res.send({ status: "ok", data: AllUser});
    }
    catch (error){
        console.log(error);
    }
})
  
//image upload 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
//   const upload = multer({ storage: storage });

// router.post("/", upload.single("testImage"), (req, res) => {
//   const saveImage = new  imageModel({
//     name: req.body.name,
//     img: {
//       data: fs.readFileSync("uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//     description : req.body.description,
//     category :req.body.category,
//     price : req.body.price,
//     diprice : req.body.diprice,
//     Quantity : req.body.Quantity,
//   });
//   saveImage.save()
//     .then(() => {
//       console.log("image is saved");
//       res.send('image is saved');
//     })
//     .catch((err) => {
//       console.log(err, "error has occurred");
//       res.status(500).send('error has occurred while saving image');
//     });
// });
// router.get('/',async (req,res)=>{
//     const allData = await imageModel.find()
//     res.json(allData)    
//   })
  
// // verify user for forgot password time
// router.post("/forgot-password", async(req,res) =>{
//     const { email} = req.body;
//     try {
//         const oldUser = await User.findOne({ email });
//         if (!oldUser){
//             return res.json({status:"user not exists!"});
//         }
//     const secret = JWT_SECRET + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret, {
//         expiresIn: "5m"
//     });
//     const link = `http://locathost:5000/reset-password/${oldUser._id}/${token}`;
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'dinkaldonda12@gmail.com',
//           pass: 'fuqwapvejvekamro'
//         } 
//     });
      
//       var mailOptions = {
//         from: 'dinkaldonda12@gmail.com',
//         to: 'dinkaldonda12@gmail.com',
//         subject: 'password reset',
//         text: link,
//       };
      
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
//     console.log(link);
//     }catch (error){}
// });

router.post("/forgot-password",(req,res)=>{
    console.log(req.body);
    const {email} = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
        const mailOptions = {
            from :process.env.EMAIL,
            to : email,
            subject :"sending email with react and node js" ,
            text: link,
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("ERROR",error)
            }else{
                console.log("email sent" + info.response);
                res.status(201),json({status : 201,info})
            }
        })
    } catch (error) {
        res.status(201),json({status : 401,error})
    }
});


router.get('/reset-password/:id/:token',async(req,res) => {
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

router.post("/setproduct", async (req, res,) => {
    const { name, description, category, price, diprice, quantity } = req.body;
   
    try {
      //const result = await cloudinary.uploader.upload(req.file.path);
      //const imageUrl = result.secure_url;
      
  
      if (!name || !description || !category || !price || !diprice || !quantity ) {
        return res.status(422).json({ error: "fill all the details" });
      }
  
      const finalProduct = new product({
        name,
        description,
        category,
        price,
        diprice,
        quantity,
       
      });
  
      const savedProduct = await finalProduct.save();
      return res.status(200).json(savedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to save product" });
    }
  });
  


// view product

router.get("/getproduct",async(req,res)=>{
    try {
        const getUser = await product.find();

        //res.status(201).json({status:201,getUser})
        return res.send({ status: "ok", data: getUser});
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// Delete Product //

router.post("/deleteproduct", async (req, res) => {
    const {userid} = req.body;
    try{
        product.deleteOne(
            {_id:userid}, function (err,res){
                console.log(err);
            }
        );
        res.send({ status: "okk", data:"Deleted"});

    }
    catch(error){
        console.log(error);
    }
});
 
// Admin Register

router.post("/admindata", async (req, res) => {

    // console.log (req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
        return res.status(422).json({ error: "fill all the details" })
    }

    try {

            const finalUser = new admindb({
                name, email, password
            });

            // here password hasing

            const storeData = await finalUser.save();

             console.log(storeData);
            return res.status(201).json({ status: 201, storeData })
        

    } catch (error) {
        return res.status(422).json(error);
        console.log("catch block error");
    }

});

// Admin Login 

router.post("/adminlogin", async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await admindb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                return res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                // console.log(token);
                // cookiegenerate
                return res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                return res.status(201).json({status:201,result})
            }
        }
        else{
            return res.status(401).json({status:401,message:"invalid details"});
        }

    } catch (error) {
        return res.status(401).json({status:401,error});
        console.log("catch block");
    }
});

// // user valid
router.get("/validadmin",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await admindb.findOne({_id:req.userId});
        return res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        return res.status(401).json({status:401,error});
    }
});
  
module.exports = router;
