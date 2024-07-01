
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import CategoryWiseProductDisplay from '../Components/CategoryWiseProductDisplay';

import SummaryApi from '../common/Index';
import VerticalCard from '../Components/VerticalCard';

const CategoryProduct = () => {
    const params = useParams();

    const [Data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [sort,setsort] = useState("")

    const handelsorting = async (value) => {
      setsort(value);
      setLoading(true);
      let res = await fetch(SummaryApi.sortProduct.url, {
          method: SummaryApi.sortProduct.method,
          credentials: "include",
          headers: {
              "content-type": "application/json",
          },
          body: JSON.stringify({
              sort: value,
              category: params.categoryName // Ensure category is included in the sorting request
          }),
      });
      const responsedata = await res.json();
      setData(responsedata.data);
      setLoading(false);

  };


  return (
    <div className='container mx-auto p-4'>
      {/* {params?.categoryName} */}
      {/* desktop */}
      <div className='flex lg:grid grid-cols-[200px,1fr]'>
        {/* leftside */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] hidden lg:grid'>
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' id='acc' name='sortby' onChange={()=>handelsorting("lowtohigh")}></input>
                <label htmlFor='acc'>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' id='dec' name='sortby' onChange={()=>handelsorting("hightolow")}></input>
                <label htmlFor='dec'>Price - High to Low</label>
              </div>
            </form>
          </div>
        </div>
        {/* right side */}
        <div>
          {
            params?.categoryName && !sort &&(
              <CategoryWiseProductDisplay category={params.categoryName} heading={"Recommended Product"}/>
            )
          }

          {
            sort &&(
              <VerticalCard loading={loading} data={Data}/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct


//16:00
