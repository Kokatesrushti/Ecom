const cartModel = require('../../models/cartProduct')

const updateAdddToCartProduct =async(req,res)=>{
    try {
        const currentuser=req.user.id

        const addToCartproductId=req.body.cartProductId
        const qty=req.body.quantity

        const updateproduct = await cartModel.findByIdAndUpdate(addToCartproductId,{
            ...(qty && {quantity:qty})
        })


        res.json({
            message : "Product updated in cart",
            error : false,
            success : true,
            data : updateproduct,
        })

    } catch (error) {
        res.status(400).json({
            message : error || error.message,
            error : true,
            success : false,
        })
    }
}

module.exports= updateAdddToCartProduct

