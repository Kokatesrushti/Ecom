

import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../../helper/fetchCategorywiseProduct";
import displayINRCurrency from "../../helper/displayCurrency";
import { Link } from "react-router-dom"
import addToCart from "../../helper/addtocart";
import Context from "../context";

const VerticleCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const LoadingList = new Array(13).fill(null);

  const { fetchUserAddToCart} = useContext(Context)

  const handelAddToCart =async(e,_id)=>{
    e.stopPropagation()
    await addToCart(e,_id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="contained mx-auto px-4 my-6">
      <h2 className="text-lg font-semibold py-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none" >
      {
        loading ?(
            LoadingList.map((product, index) => {
                return (
                  <div className="w-full min-w-[295px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow ">
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse ">
                      <img src={product?.ProductImage[0].url} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                    </div>
                    <div className="p-4 gap-2  grid">
                      <h2 className="font-medium md:text-lg text-base text-ellipsis line-clamp-1 animate-pulse rounded-full bg-slate-200 py-2" >
                      </h2>
                      <p className="text-slate-500 animate-pulse rounded-full bg-slate-200 py-2"></p>
                      <div className="flex gap-2">
                        <p className="font-medium text-green-800 animate-pulse rounded-full bg-slate-200 w-full py-2">
                         
                        </p>
                        <p className="text-slate-500 line-through md:text-xs animate-pulse rounded-full bg-slate-200 w-full p-1 py-2">

                        </p>
                      </div>
                      <button className="text-sm animate-pulse rounded-full bg-slate-200 hover:bg-yellow-400 transition-all py-1 mt-3"></button>
                    </div>
                  </div>
                );
              })
        ):(
            data.map((product, index) => {
                return (
                  <Link to={"product/"+product._id} className="w-full min-w-[295px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                      <img src={product.ProductImage[0].url} className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                    </div>
                    <div className="p-4 gap-3">
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

export default VerticleCardProduct;

