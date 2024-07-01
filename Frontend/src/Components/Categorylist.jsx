
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/Index'
import { Link } from 'react-router-dom'

const Categorylist = () => {
    const [categoryProduct,setCategoryProduct]=useState([])
    const [loading,setLoading] = useState(false)
    
    const categoryLoading=()=>{
        new Array(13).fill(null)
    }

    const fetchCategoryProduct=async()=>{
        const Response =await fetch(SummaryApi.categoryProduct.url)
        const dataResponse=await Response.json()
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center justify-around gap-4 overflow-scroll scrollbar-none'>
      {
       loading? (
        categoryLoading.map((el,index)=>{
          return(
            <div key={index} className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200  animate-pulse'></div>
          )
        })
       ):(
        categoryProduct.map((product,index)=>{
          return(
            <Link to={"/product-category/"+product?.category} key={index} className='flex-col justify-center items-center cursor-pointer max-h-40 p-4'>
              <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-2 bg-slate-200 flex justify-center items-center'>
                <img src={product?.ProductImage[0].url}  alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all'></img>
              </div>
              <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
            </Link>
        )
        })
       )
      }
      </div>
    </div>
  )
}

export default Categorylist
