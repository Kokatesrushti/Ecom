const orderModel = require("../../models/orderProductModel")

const orderController=async(req,res)=>{
    try {
        const currentuserid =req.user.id

        const orderList = await orderModel.find({userId:currentuserid}).sort({ createdAt : -1})
        // console.log("Orders found :",orderList[0].productDetails);

        res.json({
            data : orderList,
            message : "Order List",
            error : false,
            success : true,
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }

    
}

module.exports=orderController