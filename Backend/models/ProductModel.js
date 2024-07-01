const mongoose =require('mongoose');


const productSchema=new mongoose.Schema({
    ProductImage : [
        {
            url: String,
        }
    ],
    brandName : String,
    category  : String,
    description : String,
    price : Number,
    productName : String,
    sellingprice : Number,
},{
    timestamps: true,

})


module.exports=mongoose.model("Product",productSchema);