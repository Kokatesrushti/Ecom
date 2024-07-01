const cartModel = require('../../models/cartProduct')

const RemoveFromCart=async(req,res)=>{
    try {
        const addToCartproductId=req.body.cartProductId

        const deleteproduct = await cartModel.findByIdAndDelete(addToCartproductId)

        res.json({
            message : "Product Deleted from cart",
            error : false,
            success : true,
            data : deleteproduct,
        })
        

    } catch (error) {
        res.json({
            message : error || error.message,
            error : true,
            success : false,
        })
    }
}

module.exports=RemoveFromCart;

