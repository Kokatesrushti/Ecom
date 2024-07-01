import React, { useContext, useEffect, useState } from "react";
import noProduct from "../assest/noProduct.webp";
import { Link } from "react-router-dom";
import SummaryApi from "../common/Index";
import Context from "../context";
import displayINRCurrency from "../../helper/displayCurrency";
import priceDiscount from "../../helper/priceDiscount";
import { AiOutlineDelete } from "react-icons/ai";
import styled from "styled-components";
// import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartproduct).fill(null);

  const fetchData = async () => {
    setLoading(true);
    let res = await fetch(SummaryApi.addToCartViewProduct.url, {
      method: SummaryApi.addToCartViewProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responsedata = await res.json();
    setLoading(false);
    if (responsedata.success) {
      setData(responsedata.data);

    } else {
      console.log("Data fetch failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const IncreaseQty = async (id, qty) => {

    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const DecreaseQty = async (id, qty) => {

    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
        quantity: qty - 1,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };
  const handelDelete = async (id) => {
    const response = await fetch(SummaryApi.deletefromcart.url, {
      method: SummaryApi.deletefromcart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingprice,
    0
  );
  const price = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.price,
    0
  );
  const Discount = totalPrice - price;
  const deliveryCharge = totalPrice > 1000 ? 0 : 49;

  const handelPayment =async()=>{
   
    const stripePromise =await loadStripe('pk_test_51PWWK9RxvJnqJgFF4luUak4aq2Jz5ZpXbTcOJS31U7tgFiaiHdGBcCJTrMGlRV70AOrUguldVuKgkBdYl5J2Un6N00iZDRlVIC')

    const imagelist=[]
    data.forEach((item) => {
      imagelist.push( item.productId.ProductImage[0].url);
    });

    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems:data,
        imagelist:imagelist
      }),
    });
    const responseData = await response.json();

    if(responseData?.id){
      stripePromise.redirectToCheckout({sessionId:responseData.id})
    }

  }

  return (
    <div className="container mx-auto">
      {data.length === 0 && !loading && (
        <div
          className="min-h-96 h-full w-30 flex justify-center flex-col
                 items-center mx-auto mt-4"
        >
          <div className="h-30 w-30 ">
            <img src={noProduct} className="h-50 w-60 mix-blend-multiply"></img>
            <p className="text-center font-semibold text-l p-4">
              Your cart is empty!
            </p>
            <p className="text-center text-sm">Add items to it now.</p>
          </div>
          <div>
            <Link to={"/"}>
              <button className="bg-red-600 text-white p-2  mt-4 px-20 rounded-md">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      )}
      <Div className="flex lg:flex-row flex-col gap-10  lg:justify-between">
        {/* view product */}
        <div className=" lg:mx-7 mt-5  w-full">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                <div
                  key={"Loadingpage" + index}
                  className="w-full bg-slate-200 h-32 my-1 border-slate-300 animate-pulse rounded-lg"
                ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white  my-1 p-5 rounded-lg grid grid-cols-[128px,1fr]"
                  >
                  <div className="w-32 h-28">
                      <img
                        src={product.productId.ProductImage[0].url}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      ></img>
                  </div>

                  <div className="p-4 py-4">
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product.productId.productName}
                    </h2>
                        <div className="flex">
                          <p className="text-slate-400 text-sm line-through">
                          {displayINRCurrency(
                            product.productId.price * product?.quantity
                          )}
                          </p>
                          <p className="text-green-600 px-3">
                          {priceDiscount(
                            product.productId.sellingprice,
                            product.productId.price
                          )}
                          % off
                          </p>
                        </div>
                        <p className="text-xl">
                        {displayINRCurrency(
                          product.productId.sellingprice * product?.quantity
                    )}
                      </p>
                  </div>
                    <div className="py-2 flex justify-between  lg:w-80 w-72">
                      <div className="py-2 flex  justify-between lg:w-1/3 w-40  ">
                      <button
                          className=" bg-yellow-300 border-yellow-300 w-6 h-6 flex justify-center items-center font-semibold rounded hover:scale-110"
                          onClick={() => {
                            DecreaseQty(product?._id, product?.quantity);
                          }}
                      >
                        -
                      </button>
                        <span className="">{product?.quantity}</span>
                      <button
                          className=" bg-yellow-300 border-yellow-300 w-6 h-6 flex justify-center items-center font-semibold rounded hover:scale-110"
                          onClick={() => {
                            IncreaseQty(product?._id, product?.quantity);
                          }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="flex justify-center items-center px-2 font-semibold hover:text-red-600"
                        onClick={() => handelDelete(product?._id)}
                    >
                      Remove
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
                );
              })}
          {data.length !== 0 && (
            <DIV className="w-full bg-white h-16 rounded p-2 flex justify-end">
              <button className="bg-orange-600 px-20 text-base font-semibold text-white" onClick={handelPayment}>
                PLACE ORDER
              </button>
            </DIV>
          )}
        </div>

        {/* summary */}
        {loading ? (
          <div className="mt-5 w-full h-96 max-w-sm   bg-slate-200 rounded-md"></div>
        ) : (
          data.length !== 0 && (
            <div className="lg:w-2/5  w-full my-6 rounded-sm bg-white  p-5 h-fit">
              <div className=" ">
                <h2 className="text-slate-500">PRICE DETAILS</h2>
              </div>
              <hr></hr>
              <div className="mt-3">
                <div className="flex justify-between py-2">
                  Price <p>{displayINRCurrency(price)}</p>
                </div>
                <div className="flex justify-between py-2 ">
                  Discount{" "}
                  <p className="text-green-600">
                    {displayINRCurrency(Discount)}
                  </p>
                </div>

                {deliveryCharge === 0 ? (
                  <div className="flex justify-between py-2">
                    Delivery Charges{" "}
                    <div className="flex gap-3">
                      <p className="text-slate-400 line-through">
                        {displayINRCurrency(49)}
                      </p>
                      <p className="text-green-600 font-semibold">FREE</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between py-2">
                    Delivery Charges <p>{displayINRCurrency(deliveryCharge)}</p>
                  </div>
                )}
              </div>
              <hr className=" border-dotted text-lg"></hr>
              <div>
              <div className="flex justify-between font-bold text-lg py-3">
                  <h1>Total Amount </h1>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              </div>
              <hr className=" border-dotted text-lg"></hr>
              <div className="my-3">
                <h2 className="text-green-600 font-semibold">
                  You will Save {displayINRCurrency(-Discount)} on this order
                </h2>
              </div>
            </div>
          )
        )}
      </Div>
    </div>
  );
};

export default Cart;

//14:35
const Div = styled.div`
  @media (min-width: 1024px) {
    margin-left: 5rem;
  }
`;
const DIV = styled.div`
  bottom: 0px;
  position: sticky;
  box-shadow: 0px -0.1px 10px rgba(0, 0, 0, 0.185);
`;
