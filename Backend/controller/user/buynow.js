const cartModel=require("../../models/cartProduct")
const Product = require("../../models/ProductModel")


const buynow =async(req,res)=>{
    try {
        const {productId} = req?.body;
        const productInformation=await Product.findById(productId)

        const currentuser=req.user.id
        const payload={
            productId :productId ,
            quantity : 1,
            userId : currentuser,
        }
        const newaddtocart=new cartModel(payload)
        const savedcart=await newaddtocart.save();
        const allproduct=await cartModel.find({userId : currentuser,productId :productId }).populate("productId")
        

        res.json({
            message : "Product is ready to buy",
            error : false,
            success : true,
            data : allproduct,
        }) 
    } catch (error) {
        res.status(400).json({
            message : error || error.message,
            error : true,
            success : false,
        })
    }
}

module.exports =buynow