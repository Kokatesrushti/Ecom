import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common/Index";
import VerticalCard from "../Components/VerticalCard";

const SearchProduct = () => {
  
  const [data,setData]=useState([]);
  const [loading, setLoading] = useState(false);


  const query = useLocation().search;

  const fetchProduct = async () => {
    setLoading(true);
    const response = fetch(SummaryApi.searchProduct.url + query);

    const dataResponse = await (await response).json();
    setData(dataResponse.data);
    setLoading(false);    
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {
        loading && (
          <p className="text-lg text-center">Loading...</p>
        )
      }
      <p className="lext-lg font-semibold my-3">Search Results : {data?.length}</p>
      {
        data.length === 0 && !loading && (
          <p className="bg-white text-lg text-center p-4">No Data Found...</p>
        )
      }
      {
        data.length !==0 && !loading &&(
          
            <VerticalCard loading={loading} data={data}/>
          
        )
      }
    </div>
  )
};

export default SearchProduct;
