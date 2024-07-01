const ProductModel = require("../../models/ProductModel")

const filterProduct=async(req,res)=>{
    
    try {
        if(req.body.sort==="hightolow"){
            sortedProducts = await ProductModel.find({category:req.body.category}).sort({ sellingprice: -1 });
        }
        if(req.body.sort==="lowtohigh"){
            sortedProducts = await ProductModel.find({category:req.body.category}).sort({ sellingprice: 1 });
        }
        res.json({
            message: "Products fetched successfully",
            data: sortedProducts,
            error: false,
            success: true,
        });

    } catch (error) {
        res.status(400).json({
            message : message || error,
            error : true,
            success : false,
        })
    }
}

module.exports=filterProduct
