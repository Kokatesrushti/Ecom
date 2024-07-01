import React from 'react'
import { IoIosClose } from "react-icons/io";
const DisplayImage = ({
    openfullscreen,
    setOpenFullScreen, 
    imageurl,
}) => {
  return (
   <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
    <div className='bg-white shadow-lg rounded max-w-5x1 mx-auto'>
    <div
            className="w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer p-4"
            onClick={() => {
              setOpenFullScreen(!openfullscreen);
            }}
          >
            <IoIosClose />
          </div>
     <div className='flex justify-center p-4 max-h-[70vh] max-w-[70vw]'>
      <img src={imageurl} alt="image" className='w-full h-full' />
    </div>
    </div>
   </div>
  )
}

export default DisplayImage
