const cartModel=require("../../models/cartProduct")

const addToCart=async(req,res)=>{
    try {
        const {productId} = req?.body;
        const currentuser=req.user.id
        
        const isProductAvailable = await cartModel.findOne({ productId, userId: currentuser });
        

        if(isProductAvailable){
            res.status(400).json({
                message : "Product is alredy exits in Add to cart",
                error : true,
                success : false,
            })
        }else{
            const payload={
                productId : productId,
                quantity : 1,
                userId : currentuser,
            }
    
            const newaddtocart=new cartModel(payload);
            const savedcart=await newaddtocart.save();
    
            res.json({
                message : "Product added in cart",
                error : false,
                success : true,
                data : savedcart,
            }) 
        }
        
    } catch (error) {
        res.status(400).json({
            message : error || error.message,
            error : true,
            success : false,
        })
    }
}
module.exports=addToCart