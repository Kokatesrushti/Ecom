const ProductModel = require("../../models/ProductModel")

const getproductDetails = async(req,res)=>{

    try {
        const {productId}=req.body
        const product = await ProductModel.findById(productId)
        res.json({
            message : "Product Details",
            data : product,
            error : false,
        })
    } catch (error) {
        message=error.message
        res.status(400).json({
            message :error?.message || error,
            error : true,
            success : false,
        })
    }
}

module.exports=getproductDetails
