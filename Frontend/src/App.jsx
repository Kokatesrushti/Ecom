import { useDispatch } from 'react-redux'

import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'

import Fotter from './Components/Fotter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common/Index'
import Context from './context'
import { setUserDetails } from './store/userSlice'


function App() {
 

  const dispatch = useDispatch();
  const [cartproduct,setcartproduct] = useState(0);

  //after every render a userEffect calles this function
  //this function fetches the userDetails url and gets the response that contain user info
  //then it user some function in redux toolkit
  const fetchUserDetails =async()=>{
    const response = await fetch(SummaryApi.CurrentUser.url,{
      method:SummaryApi.CurrentUser.method,
      credentials:'include',
     
    })
    const data = await response.json();
    if(data.success){
      dispatch(setUserDetails(data.data))
    }
  }

  const fetchUserAddToCart =async()=>{
    
    const response = await fetch(SummaryApi.addtocartproductCount.url,{
      method:SummaryApi.addtocartproductCount.method,
      credentials:'include',

    })
    const data = await response.json();
    setcartproduct(data?.data?.count)
  }


  //user details will we calculated


  useEffect(()=>{
    fetchUserDetails();
    fetchUserAddToCart();
  },[])

  return (
    <Context.Provider value={{
      fetchUserDetails, //user details 
      cartproduct,
      setcartproduct,
      fetchUserAddToCart
    }}>

    <ToastContainer
    position='top-center'
    />
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16'>
      <Outlet/>
    </main>
    <Fotter/>
    </Context.Provider>
  )
}

export default App

// An <Outlet> should be used in parent route elements 
// to render their child route elements. This allows nested UI 
// to show up when child routes are rendered. If the 
// parent route matched exactly, it will render a 
// child index route or nothing if there is no index route