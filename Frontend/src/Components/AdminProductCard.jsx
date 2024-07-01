
import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct'
import displayINRCurrency from '../../helper/displayCurrency';

const AdminProductCard = ({product,fetchAllProducts}) => {
    const [editProduct,setEditProduct]=useState(false)
  return (
    <div key={product._id} className='bg-white p-4 rounded max-h-50 overflow-hidden '>
    <div className='w-40 '>
    <img src={product.ProductImage[0]?.url} width={120} height={120} className='max-h-20 w-fit mx-auto' alt="" />
    <h1 className='text-ellipsis line-clamp-2 '>{product.productName}</h1>

  <div>

    <p className='font-semibold'>
      {
        displayINRCurrency(product.sellingprice)
      }
    </p>
  <div className='w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white' onClick={()=>setEditProduct(!editProduct)}>
    <MdEdit />
    </div>
  </div>
    {
      editProduct &&  <AdminEditProduct product={product} editProduct={editProduct} setEditProduct={setEditProduct} fetchAllProducts={fetchAllProducts}/>
    }
    </div>
  </div>
  )
}

export default AdminProductCard
