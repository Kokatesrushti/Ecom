const express =require ('express')
const signupController =require('../controller/user/userSignup')
const loginController=  require('../controller/user/userSignin')
const userController =require('../controller/user/userDetails')
const AllusersController =require('../controller/user/Allusers')
const logoutController =require('../controller/user/userLogout')
const updateuser =require('../controller/user/Updateuser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProduct=require('../controller/product/getproduct')
const router =express.Router()
const wrapAsync = require("../utils/wrapAsync");
const authToken  = require('../middleware/authToken')
const UpdateProduct = require('../controller/product/UpdateProduct')
const getProductCon = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addtocart = require('../controller/user/addToCart')
const CountAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAdddToCartProduct = require('../controller/user/updateAddToCartProduct')
const RemoveFromCart = require('../controller/user/RemoveFromCart')
const searchProduct = require('../controller/product/searchProduct')
const filterProduct = require('../controller/product/filterProduct')
const payment = require('../controller/order/payment')
const webhook = require('../controller/order/webhook')
const orderController = require('../controller/order/orderController')
const buynow = require('../controller/user/buynow')


router
    .route("/signup")
    .post(signupController.userSignUpController)

router
   .route("/Login")
   .post(wrapAsync(loginController.userSignin))

router
   .route("/userDetails")
   .get(authToken,wrapAsync(userController.userDetails))

router
   .route("/logout")
   .get(wrapAsync(logoutController.userLogout))

router
    .route("/all-user")
    .get(authToken,wrapAsync(AllusersController.Allusers))

router
    .route("/change-role")
    .post(authToken, wrapAsync(updateuser.Updateuser))

router    
    .route("/upload-product")
    .post(authToken, wrapAsync(uploadProductController.uploadProduct))

router
    .route("/all-product")    
    .get((getProduct.getProductController))

router
    .route("/update-product")
    .post(authToken, wrapAsync(UpdateProduct)) 
    
router
    .route("/get-categoryProduct")
    .get((getProductCon))
    
router
    .route("/category-Product")
    .post((getCategoryWiseProduct))

router
    .route("/product-details")
    .post((getProductDetails))    

router
    .route("/addtocart")    
    .post(authToken, wrapAsync(addtocart))

router
    .route("/countAddToCartProduct")
    .get(authToken, wrapAsync( CountAddToCartProduct))

router
    .route("/addToCartViewProduct")
    .get(authToken, wrapAsync( addToCartViewProduct))

router
    .route("/update-Cart-Product")
    .post(authToken, wrapAsync(updateAdddToCartProduct))

router
    .route("/delete-from-cart")
    .post(authToken, wrapAsync(RemoveFromCart)) 
    
router
    .route("/search-product")
    .get(wrapAsync(searchProduct))

router
    .route("/sort-product") 
    .post(wrapAsync(filterProduct))  
    
router
    .route("/checkout")  
    .post(authToken, wrapAsync(payment))  

router
    .route('/webhook')
    .post(wrapAsync(webhook)) // /webhook

router
    .route('/order-list')
    .get(authToken,wrapAsync(orderController))

router
    .route('/buy-now')
    .post(authToken, wrapAsync(buynow))    

module.exports=router
// router
//     .route("/login")
//     .get(userController.renderLoginForm)
//     .post(saveRedirectUrl,
//     passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
//     wrapAsync(userController.login));
