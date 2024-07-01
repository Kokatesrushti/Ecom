const cartModel=require("../../models/cartProduct")

const CountAddToCartProduct = async(req,res)=>{
    try {
        const userId = req.user.id 

        const count = await cartModel.countDocuments({
            userId :userId 
        })

        res.json({
            data : {
                count : count
            },
            message : "Count of Add to cart Product",
            error : false,
            success : true,
        })
    } catch (error) {
        res.status(400).json({
            message : error || error.message,
            error : true,
            success : false,
        })
    }
}

module.exports=CountAddToCartProduct