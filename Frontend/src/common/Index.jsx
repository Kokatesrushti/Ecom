// export default function Index(){





    const backendDomin="http://localhost:8080"
    // const backendDomin="https://mern-stack-e-commerce-rurq.vercel.app/"

    //here path is only written if new page is not rendring
    //this paths are use by frontend to connect with backend
    const SummaryApi={
        signUP:{
            url : `${backendDomin}/signup`,
            method : "POST"
        },
        login:{
            url : `${backendDomin}/Login`,
            method : "POST"
        },
        CurrentUser:{
            url : `${backendDomin}/userDetails`,
            method : "GET"
        },
        logout:{
            url : `${backendDomin}/logout`,
            method : "GET"
        },
        Allusers:{
            url : `${backendDomin}/all-user`,
            method : "GET"
        },
        changeUserRole:{
            url : `${backendDomin}/change-role`,
            method : "POST"
        },
        uploadProduct:{
            url : `${backendDomin}/upload-product`,
            method : "POST"
        },
        allproduct:{
            url : `${backendDomin}/all-product`,
            method : "GET"
        },
        updateProduct:{
            url : `${backendDomin}/update-product`,
            method : "POST"
        },
        categoryProduct:{
            url : `${backendDomin}/get-categoryProduct`,
            method : "GET"
        },
        categoryWiseProduct:{
            url : `${backendDomin}/category-Product`,
            method : "POST"
        },
        ProductDetails:{
            url : `${backendDomin}/product-details`,
            method : "POST"
        },
        addtocartproduct:{
            url : `${backendDomin}/addtocart`,
            method : "POST"
        },
        addtocartproductCount:{
            url : `${backendDomin}/countAddToCartProduct`,
            method : "GET"
        },
        addToCartViewProduct:{
            url : `${backendDomin}/addToCartViewProduct`,
            method : "GET"
        },
        updateCartProduct:{
            url : `${backendDomin}/update-Cart-Product`,
            method : "POST"
        },
        deletefromcart:{
            url : `${backendDomin}/delete-from-cart`,
            method : "POST"
        },
        searchProduct:{
            url : `${backendDomin}/search-product`,
            method : "GET"
        },
        sortProduct:{
            url:`${backendDomin}/sort-product`,
            method:"POST"
        },
        payment :{
            url:`${backendDomin}/checkout`,
            method:"POST"
        },
        order :{
            url:`${backendDomin}/order-list`,
            method:"GET"
        },
        buynow :{
            url:`${backendDomin}/buy-now`,
            method:"POST"
        }
        
    }
// }
export default SummaryApi;