const userModel = require("../../models/userModel");


module.exports.Allusers=async(req,res)=>{

    try{

        const Allusers=await userModel.find()
        res.json({
            message : "All users",
            error : false,
            success : true,
            data : Allusers
        })
    }catch(error){
        message=error.message
        res.status(400).json({
            message : message || error,
            error : true,
            success : false,
        })
    }
}