import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link ,useNavigate} from 'react-router-dom';
import styled from "styled-components"
import SummaryApi from '../common/Index';
import { toast } from 'react-toastify';
import Context from '../context';




function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    let [formData,setformData]=useState({
      email:"",
      password:""
  })
  const navigate=useNavigate()
  const {fetchUserDetails} = useContext(Context)
  const { fetchUserAddToCart} = useContext(Context)


  let handelInputChange = (event)=>{
    // let fieldname= event.target.name
    // let newvalue= event.target.value
    
    setformData((currData)=>{
        // currData[fieldname]=newvalue;
        return {...currData, [ event.target.name]:event.target.value};
    }
    )
}
let handelSubmit=async(event)=>{
  event.preventDefault();

  const dataResponse=await fetch(SummaryApi.login.url,{
    method : SummaryApi.login.method,
    credentials:'include',
    headers:{
      "content-type" : "application/json"
    },
    body:JSON.stringify(formData),
  })
  const data= await dataResponse.json()

  if(data.success){
    toast.success(data.message)
    navigate("/")
    fetchUserDetails()
    fetchUserAddToCart()
  }
  if(data.error)
  {
    if(!data.message){
      toast.error("Something went wrong")
      return
    }
    toast.error(data.message)
    setformData({
        email:"",
        password:""
    })
  }
}
  return (
    <div>
     <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 py-5 w-full max-w-md  mx-auto rounded'>
                <div className='w-20 h-20 mx-auto'>
                <Image className='sign-up-img' src={loginIcon} alt="img"/>
                </div>
                <form className='pt-6 pt-6 flex-col gap-8' onSubmit={handelSubmit}>
                    <div className='grid'>
                        <label htmlFor="email">Email :</label>
                        <div className='bg-slate-200 p-2 rounded-full'>
                           <input 
                           type="email" 
                           id="email" 
                           name='email' 
                           placeholder='Enter email' 
                           value={formData.email} 
                           onChange={handelInputChange} 
                           className='w-full h-full  outline-none bg-transparent'/>
                        </div>
                       
                    </div>
                    <div>
                        <label htmlFor="password">Password :</label>
                       <div className='bg-slate-200 p-2 rounded-full flex items-center'>
                          <input 
                          id="password" 
                          name='password' 
                          value={formData.password} 
                          type={showPassword?"text":"password"} 
                          onChange={handelInputChange} placeholder='Enter password'className='w-full h-full outline-none  bg-transparent'/>
                          <div className='cursor-pointer'>
                            <span >
                                {
                                     showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />
                                }

                            </span>
                          </div>
                       </div>
                       <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot password?</Link>
                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
                </form>
                <p className='my-4 '>Don't have account?<Link to={'/sign-up'} className='text-red-600 hover:underline hover:text-red-700 px-2'>Sign-up</Link></p>

            </div>
        </div>
     </section>
    </div>
  )
}
const Image = styled.img`
  filter: contrast(2);
`
export default Login
