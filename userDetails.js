const mongoose= require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
    {
        name: String,
        email: {type: String, unique: true },
        mobile: String,
        password: String,
        cpassword: String,
       
    },
    {
        collection: "UserInfo",
    }
);
mongoose.model("UserInfo",UserDetailsScehma);