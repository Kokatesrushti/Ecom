

import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../../helper/fetchCategorywiseProduct";
import displayINRCurrency from "../../helper/displayCurrency";
import { Link } from "react-router-dom"
import addToCart from "../../helper/addtocart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const LoadingList = new Array(13).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };
  const { fetchUserAddToCart} = useContext(Context)

  const handelAddToCart =async(e,_id)=>{
    e.stopPropagation()
    await addToCart(e,_id)
    fetchUserAddToCart()
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="contained mx-auto px-4 my-6">
      <h2 className="text-lg font-semibold py-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none">
      {
        loading ? (
          LoadingList.map((product, index) => {
            return (
              <div  className="w-full min-w-[295px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse">
                  <img src={product?.ProductImage[0].url} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                </div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 bg-slate-200 animate-pulse rounded-full" >
                    {product?.productName}
                  </h2>
                  <p className="text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-2 w-full">
                    <p className="font-medium text-green-800 p-1 bg-slate-200 w-full animate-pulse rounded-full">
                      
                    </p>
                    <p className="text-slate-500 line-through md:text-xs p-1 bg-slate-200 w-full animate-pulse rounded-full">
                      
                    </p>
                  </div>
                  <button className="text-sm bg-slate-200 hover:bg-yellow-400 transition-all px-3 py-1 first-letter:mt-3 p-0.5 w-full animate-pulse rounded-full"></button>
                </div>
              </div>
            );
          })
        ):(
          
          data.map((product, index) => {
            return (
              <Link to={"product/"+product._id} className="w-full min-w-[295px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img src={product.ProductImage[0].url} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                </div>
                <div className="p-4 ">
                  <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="text-slate-500">{product?.category}</p>
                  <div className="flex gap-2">
                    <p className="font-medium text-green-800">
                      {displayINRCurrency(product?.sellingprice)}
                    </p>
                    <p className="text-slate-500 line-through md:text-xs">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button onClick={(e)=>handelAddToCart(e,product?._id)} className="text-sm bg-yellow-300 hover:bg-yellow-400 transition-all px-3 py-1 rounded-full mt-3">Add to Cart</button>
                </div>
              </Link>
            );
          })
        )
     
      }
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
//10:19
