const Product = require("../../models/ProductModel")

const uploadProductPermission =require("../../helper/permission")
async function uploadProduct(req,res){

    try {

        const sessionuserid = req.user.id

        if(!uploadProductPermission(sessionuserid)){
            throw new Error("You are not allowed to upload product")
        }

        const uploadProduct1 = await new Product(req.body);

        const saveProduct = await uploadProduct1.save();


        res.status(201).json({
            message : "Product uploaded successfully",
            success : true,
            error: false,
            data : saveProduct,
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

module.exports = {
    uploadProduct,
}