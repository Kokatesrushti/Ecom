const ProductModel= require("../../models/ProductModel")
module.exports=getCategoryProduct= async(req,res)=>{

    try {
        const productCategory = await ProductModel.distinct("category")

        //array to store one product from each category
        const productByCategory=[]
        for(const category of productCategory){
            const product = await ProductModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }
    res.json({
        message:"Category product",
        data:productByCategory,
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
