const userModel =require("../../models/userModel")
module.exports.Updateuser=async(req,res)=>{
   try {
  
    let user= await userModel.findById(req.body.id)
    let ress=await userModel.findByIdAndUpdate(user,{role:req.body.role})
    res.json({
        message : "Updated",
        error : false,
        success : true,
        data : ress
    })
   } catch (error) {
    message=error.message
    res.status(400).json({
        message : message || error,
        error : true,
        success : false,
    })
   }
}