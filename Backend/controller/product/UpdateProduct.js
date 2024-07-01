const uploadProductPermission =require("../../helper/permission")
const ProductModel = require("../../models/ProductModel")

module.exports = updateProduct=async(req,res)=>{

    try {
        if(!uploadProductPermission(req.user.id)){
            throw new Error("You are not allowed to upload product")
        }
        const {_id,...resBody} = req.body


        const updatedProduct = await ProductModel.findByIdAndUpdate(
            _id, 
            resBody, 
            { new: true, runValidators: true } // Options to return the updated document and run validation
        );


        res.json({
            message : "Product Updated Successfully",
            success : true,
            data : updateProduct,
            error : false,
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