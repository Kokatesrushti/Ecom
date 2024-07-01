import React from 'react'
import image from '../assest/success.gif'
import { Link } from 'react-router-dom'


const succes = () => {
  return (
    <div className='bg-slate-100 w-full max-w-auto flex justify-center items-center flex-col p-4'>
      <img src={image}
      width={400} height={400} className='mix-blend-multiply'></img>
      <p className='text-xl font-bold text-green-600'>Payement Successful </p>
      <Link to={'/order'} className='p-2 my-2 border-2 mt-5 border-green-600 px-3 rounded-sm font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default succes
