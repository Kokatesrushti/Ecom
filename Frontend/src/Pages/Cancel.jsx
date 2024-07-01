import React from 'react'
import image from '../assest/Cancel.gif'
import { Link } from 'react-router-dom'


const Cancel = () => {
  return (
    <div className='bg-slate-100 w-full max-w-auto flex justify-center items-center flex-col p-4'>
      <img src={image}
      width={400} height={400} className='mix-blend-multiply'></img>
      <p className='text-xl font-bold text-red-600'>Payement Cancel </p>
      <Link to={'/cart'} className='p-2 my-2 border-2 mt-5 border-red-600 px-3 rounded-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
    </div>
  )
}

export default Cancel
