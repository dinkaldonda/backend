require("dotenv").config();
const express = require("express");
const app1 = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8010;


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app1.use(express.json());
app1.use(cookiParser());
app1.use(cors());
app1.use(router);


app1.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})