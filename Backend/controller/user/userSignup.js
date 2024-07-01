
const User=require("../../models/userModel")
const bcrypt=require("bcrypt")

module.exports.userSignUpController=async(req,res)=>{

    
    try{
        const {username, email, password,  profilepic, filename}=req.body;

        if(!email){
            throw new Error("Email is required")
        }
        if(!username){
            throw new Error("Name is required")
        }
        if(!password){
            throw new Error("Password is required")
        }


        let salt =bcrypt.genSaltSync(10);
        let hashPassword =await bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Password not hashed")
        }
        
        let url=profilepic;  //to get the path of the uploaded image.
        const payload={
            ...req.body,
            password:hashPassword,
        }
        let newuser = await new User(payload);

        newuser.profilePic={url,filename};
        

        let userindb=await newuser.save();

        
        res.status(201).json({
            message : "User registered successfully",
            error : false,
            success : true,
            data :userindb,
        })
    }catch(err){
        res.json({
            message : err,
            error : true,
            success : false,
        })
    }
}