
import { useEffect, useState } from 'react'
import SummaryApi from '../common/Index'
import noProduct from "../assest/noProduct.webp";
import { Link } from "react-router-dom";
import moment from 'moment'
import  displayINRCurrency  from '../../helper/displayCurrency'


function OrderPage() {

    const [data,setdata] = useState([])

    const fetchorderDetails = async()=>{
        const response = await fetch(SummaryApi.order.url,{
            method:SummaryApi.order.method,
            credentials:"include"
        })
        const responseData = await response.json()
        setdata(responseData.data)


    }

    useEffect(()=>{
        fetchorderDetails()
    },[])

  return (
    <div>
      {
        data.length===0 && (
            <div
              className="min-h-96 h-full w-30 flex justify-center flex-col
                     items-center mx-auto mt-4"
            >
              <div className="h-30 w-30 ">
                <img src={noProduct} className="h-50 w-60 mix-blend-multiply"></img>
                <p className="text-center font-semibold text-l p-4">
                  Your have no orders yet
                </p>
                <p className="text-center text-sm">Order Now</p>
              </div>
              <div>
                <Link to={"/"}>
                  <button className="bg-red-600 text-white p-2  mt-4 px-20 rounded-md">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          )
      }
      <div>
        {
            data.map((item,index)=>{
                return(
                    <div key={index}>
                        <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                        <div>
                            {
                            
                             item?.productDetails.map((product, index)=>{
                              
                              return(
                                <div className='flex bg-white m-2 rounded border border-slate-200 p-3 justify-between'>
                                  <div className='flex'>
                                  <div>
                                  <img
                                  src={item.productDetails[0].image[index]} className='w-28 h-28 mix-blend-multiply object-scale-down p-2'></img>
                                </div>
                                <div className='max-w-96 h-fit pt-2'>
                                  <p>{item.productDetails[index].name}</p>
                                  <p>{displayINRCurrency(item.productDetails[index].price)}</p>
                                </div>
                                  </div>
                               
                                <div className='flex flex-col justify-center items-center'>
                                  <p className='font-semibold'>Quentity</p>
                                  <p>{item.productDetails[index].quantity}</p>
                                </div>
                                
                                </div>
                              )
                             })
                              
                            }
                        </div>
                        <div className='bg-white p-3 m-2' >
                              <h3 className='text-lg font-semibold'>
                                Payment Details
                              </h3>
                              <div>
                                <div className='flex flex-wrap justify-center mb-6 gap-2'>
                                  <p className='font-bold'>Payment Id </p><p>{item.paymentDetails.paymentId}</p>
                                </div>
                                <div className='flex gap-11'>
                                <p className='font-semibold'>Payment status </p> <p>{item.paymentDetails.payment_status}</p>
                                </div>
                                <div className='flex gap-8'>
                                  <p className='font-semibold'>Payment method</p> <p>{item.paymentDetails.payment_method_type[0]                                  }</p>
                                </div>
                                <div className='flex gap-8'>
                                  <p className='font-semibold' >Shipping Charges </p><p>{item.shipping_options[0].shipping_amount}</p>
                                </div>
                                <div className='flex gap-14'>
                                  <p className='font-semibold'>Total Amount</p> <p>{item.totalAmount}</p>
                                </div>
                              </div>
                        </div>
                    </div>
                    
                )
            })
        }
      </div>
    </div>
  )
}

export default OrderPage
