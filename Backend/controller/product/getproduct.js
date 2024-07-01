const ProductModel = require('../../models/ProductModel')


//get all products
module.exports.getProductController = async(req,res)=>{
    try {
        const allProducts = await ProductModel.find({}).sort({ createdAt : -1})
        res.json({
            message : "All Products",
            error : false,
            data : allProducts
        })
    } catch (error) {
        message=error.message
        res.status(400).json({
            message :error,
            error : true,
            success : false,
        })
    }
}


