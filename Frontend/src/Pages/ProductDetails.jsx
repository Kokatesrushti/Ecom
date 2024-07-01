

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/Index'
import displayINRCurrency from '../../helper/displayCurrency'
import addToCart  from '../../helper/addtocart'
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";

import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import CategoryWiseProductDisplay from '../Components/CategoryWiseProductDisplay';
import priceDiscount from '../../helper/priceDiscount'
import {loadStripe} from '@stripe/stripe-js';
import Context from '../context'

const ProductDetails = () => {

  const { fetchUserAddToCart} = useContext(Context)

  const handelAddToCart =async(e,_id)=>{
    e.stopPropagation()
    await addToCart(e,_id)
    fetchUserAddToCart()
  }
  const [data,setdata]=useState({
    ProductImage : [
      {
          url: "",
      }
  ],
  brandName : "",
  category  : "",
  description : "",
  price : "",
  productName : "",
  sellingprice : "",
})

const productId = useParams()
const [loading,setLoading]=useState(false)
const productImageListLoading = new Array(4).fill(null)
const [activeImage,setActiveImage]=useState("")
const [zoomImage,setZoomImage]=useState({
  x:0,
  y:0
})
const [array,setArray]=useState([])

const fetchData = async (data) => {
  let res = await fetch(SummaryApi.buynow.url, {
    method: SummaryApi.buynow.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId:data._id
    }),
  });
  const responsedata = await res.json();
  return responsedata

};


const handelPayment =async()=>{
 let array=[]
 let rs=await fetchData(data)

  array[0]=rs.data[0]

  const stripePromise =await loadStripe('pk_test_51PWWK9RxvJnqJgFF4luUak4aq2Jz5ZpXbTcOJS31U7tgFiaiHdGBcCJTrMGlRV70AOrUguldVuKgkBdYl5J2Un6N00iZDRlVIC')

  const imagelist=[]
    imagelist.push( array[0].productId.ProductImage[0].url);

  const response = await fetch(SummaryApi.payment.url, {
    method: SummaryApi.payment.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      cartItems:array,
      imagelist:imagelist
    }),
  });
  const responseData = await response.json();

  if(responseData?.id){
    stripePromise.redirectToCheckout({sessionId:responseData.id})
  }
}

const [zoomImg,setZoomImg] = useState(false)

const fetchProductDetails =async()=>{
  setLoading(true)
  const response = await fetch(SummaryApi.ProductDetails.url,{
    method : SummaryApi.ProductDetails.method,
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify({
      productId : productId?.id,
    })
  })
  setLoading(false)
  const dataResponse= await response.json();

  setdata(dataResponse?.data)
  setActiveImage(dataResponse?.data?.ProductImage[0]?.url ||data.ProductImage[0].url)
}

const handelmouseEnterProduct =(url)=>{
  setActiveImage(url)
}

useEffect(()=>{
  fetchProductDetails()
},[productId])

// The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
// useCallback is a React Hook that lets you cache a function definition between re-renders.
const handelZoomImage=useCallback((e)=>{
  setZoomImg(true)
  const {left,top,width,height}=e.target.getBoundingClientRect()

  const x = (e.clientX - left)/width
  const y = (e.clientY - top)/height
  setZoomImage({
    x,y
  })

},[zoomImage])

const handelZoomOutImage = ()=>{
  setZoomImg(false)
}

const discount = priceDiscount(data?.sellingprice,data?.price)
  return (
    <div className='container mx-auto p-4 '>

      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>

        <div className='h-96 flex-col lg:flex-row-reverse gap-4 items-center flex relative'>
          {/* product image */}
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handelZoomImage} onMouseLeave={handelZoomOutImage} alt=''></img>
            {/* Product zoom */}
            {
              zoomImg && (
                <div className='hidden lg:block absolute min-w-[300px] min-h-[300px] bg-slate-200 p-1 -right-[350px] top-10 rounded-full'>
                <div className='w-full h-full min-h-[300px] min-w-[300px]  bg-slate-200  scale-150  rounded-full' style={{
                  backgroundImage: `url(${activeImage})`, 
                  backgroundRepeat: "no-repeat", 
                  backgroundPosition: `${zoomImage.x*100}% ${zoomImage.y*100}%`,
                }}>
  
                </div>
              </div>
              )
            }
          </div>
          <div className='h-full '>
            {
              loading ? (
                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((item,index)=>{
                      return(
                      <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse'></div>
                    )})
                  }
                </div>
              ):(
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full md:items-center items-center '>
                  {
                    data.ProductImage.map((item,index)=>{
                      return(
                      <div key={index} className='h-20 w-20 bg-slate-200 rounded'>
                        <img src={item.url} className='w-full h-full object-scale-down mix-blend-multiply p-1 cursor-pointer' alt="" onMouseOver={()=>handelmouseEnterProduct(item.url)}/>
                      </div>
                    )})
                  }
                </div>
              )
            }
          </div>
        </div>
       {
        loading ? (
          <div className='grid gap-1 w-full'>
        <p className='bg-slate-200 animate-pulse py-2 rounded-full inline-block  px-5 w-full lg:h-8'></p>
        <h2 className='lg:h-8 lg:text-2xl text-xl font-medium h-6 w-full animate-pulse rounded-full bg-slate-200 '></h2>
        <p className='lg:h-8 text-slate-400 bg-slate-200 min-w-[100px] animate-pulse rounded-full h-6 w-full'></p>

        <div className='flex bg-slate-200 h-6 animate-pulse rounded-full text-green-600 items-center gap-1 w-full'>
        
        </div>
      <div className='flex gap-4 items-center text-xl lg:text-2xl font-medium my-1'>
        <p className='lg:h-8 text-slate-400 line-through bg-slate-200 h-6 animate-pulse rounded-full w-full'></p>
        <p className='lg:h-8 bg-slate-200 h-6 animate-pulse rounded-full w-full'></p>
      </div>
      <div>
        <p className=' lg:h-8 font-medium my-1 bg-slate-200 h-6 animate-pulse rounded-full w-full'> </p>
        <p className=' lg:h-8 bg-slate-200 h-10 animate-pulse rounded-full w-full'></p>
      </div>
      <div className=' flex items-center gap-3 w-full my-2'>
        <button className='border-2 lg:h-12 bg-slate-200 h-6 animate-pulse rounded-full px-3 py-1 min-w-[120px]  w-full'></button>
        <button className='border-2 lg:h-12 bg-slate-200 h-6 animate-pulse rounded-full px-3 py-1 min-w-[120px] w-full '></button>
      </div>
      </div>
        ):(
          <div className='flex flex-col gap-1'>
        <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
        <h2 className='lg:text-2xl text-xl font-medium'>{data?.productName}</h2>
        <p className='text-slate-400'>{data?.category}</p>

        <div className='flex text-green-600 items-center gap-1'>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalf />
        </div>
      <div className='flex gap-4 items-center text-xl lg:text-2xl font-medium my-1'>
        <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
        <p className='text-green-600'>{discount}% off</p>
        <p className=''>{displayINRCurrency(data.sellingprice)}</p>
      </div>
      <div>
        <p className='font-medium my-1'>Highlights : </p>
        <p>{data.description}</p>
      </div>
      <div className=' flex items-center gap-3 w-full my-2'>
        <button onClick={(e)=>handelAddToCart(e,data?._id)} className='border-2 border-yellow-500 px-3  min-w-[160px] text-yellow-500 font-medium hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center py-3'><FaCartShopping /> Add to Cart</button>
        <button className='border-2  border-yellow-500  px-3  min-w-[160px]  font-medium bg-yellow-500 hover:text-black transition-all flex items-center justify-center py-3 ' onClick={handelPayment}><BsFillLightningChargeFill/>BUY NOW</button>
      </div>
      </div>
        )
       }

      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
        )
      }
      
    </div>
  )
}

export default ProductDetails

