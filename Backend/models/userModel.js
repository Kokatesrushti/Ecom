const mongoose =require('mongoose');
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:String,
    profilePic:{
        url:String,
        filename:String,
    },
    role:{
        type:String,
        default:"General"
    }
},{
    timestamps: true,
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);