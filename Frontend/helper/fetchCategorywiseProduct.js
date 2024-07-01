import SummaryApi from "../src/common/Index"


const fetchCategoryWiseProduct =async(category)=>{
    const response =await fetch(SummaryApi. categoryWiseProduct.url,{
        method:SummaryApi. categoryWiseProduct.method,
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify({category})
        //sending this category to backend
    })
    const dataResponse =await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct