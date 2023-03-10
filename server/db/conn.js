const mongoose = require("mongoose")

const DB = "mongodb+srv://Nisha:nisha123@cluster0.ltrcc2p.mongodb.net/Authusers?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})