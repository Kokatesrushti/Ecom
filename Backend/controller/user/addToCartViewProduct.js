const cartModel =require("../../models/cartProduct")

const addToCartViewProduct =async(req,res)=>{
    try {
        const currentuser=req.user.id;

        const allproduct=await cartModel.find({userId : currentuser}).populate("productId")


        res.json({
            data:allproduct,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(400).json({
            message : error || error.message,
            error : true,
            success : false,
        })
    }
}

module.exports=addToCartViewProduct