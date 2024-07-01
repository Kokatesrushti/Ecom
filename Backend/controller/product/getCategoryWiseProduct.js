const { model } = require("mongoose")
const ProductModel = require("../../models/ProductModel")

module.exports = getCategoryProduct = async(req,res)=>{
    try {
        const { category } =req?.body || req?.query

        const product = await ProductModel.find({category})
        res.json({
            message:"Category product",
            data:product,
            success:true,
            error:false,
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