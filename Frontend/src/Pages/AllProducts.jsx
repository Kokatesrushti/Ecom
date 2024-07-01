import React, { useEffect, useState } from 'react'
import AdminProductCard from '../Components/AdminProductCard'

import UploadProduct from '../Components/UploadProduct'
import SummaryApi from '../common/Index'

const AllProducts = () => {
  const [openUploadProduct,setopenUploadProduct]=useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProducts = async(req,res)=>{
    const response = await fetch(SummaryApi.allproduct.url)
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])
  return (
    <div>
      <div className=" bg-white py-2 px-4 flex justify-between items-center">
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={(e)=>{setopenUploadProduct(!openUploadProduct)}}>Upload Product</button>
      </div>
      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product,index)=>{
            return (
              <AdminProductCard product={product} key={index} fetchAllProducts={fetchAllProducts}/>
            )
          })
        }
      </div>
      {
        openUploadProduct && (
          <UploadProduct close={openUploadProduct} setclose={setopenUploadProduct} fetchAllProducts={fetchAllProducts}/>
        )
      }
      
    </div>
  )
}

export default AllProducts
