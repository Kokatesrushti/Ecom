const mongoose =require('mongoose');


const cartSchema=new mongoose.Schema({
    productId : {
        // Now, you can reference documents in other collections. 
        // You can replace a specified path in a document with document(s) from other collection(s), this process is known as population
        ref:"Product",
        type:String,
    },
    quantity : Number,
    userId : String,
},{
    timestamps: true,

})


module.exports=mongoose.model("cartModel",cartSchema);