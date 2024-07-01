const bcrypt=require("bcrypt")
const Usermodel=require("../../models/userModel")
const jwt=require("jsonwebtoken")


module.exports.userSignin=async(req,res,err)=>{

    try {
        const {email, password} = req.body;
        

        if(!email){
            throw new Error("Email is required")
        }

        if(!password){
            throw new Error("Password is required")
        }

        const user = await Usermodel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }
       
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const tokendata = {
                _id : user._id,
                email : user.email
            }

            //token
            const token = await jwt.sign(tokendata, process.env.JWT_SECRET, {expiresIn : "8h"})

            const tokenOption = {
                httpOnly : true,
                secure:true
            }

            //cookie, passing token in cookie
            res.cookie("token",token,tokenOption).json({
                message : "User signin successfully",
                error : false,
                success : true,
                data : token
            })
        }
        else{
            
            throw new Error("Invalid password")
        }
    } catch (err) {
        let message = err.message
        res.json({
            message : message,
            error : true,
            success : false,
        })
    }
}
