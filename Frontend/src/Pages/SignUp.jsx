import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import SummaryApi from '../common/Index';
import { toast } from 'react-toastify';



const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
    let [formData,setformData]=useState({
      username:"",
      email:"",
      password:"",
      conformpassword:"",
      profilepic:"" ,
      filename:""
  })

  const navigate=useNavigate()

  let handelInputChange = (event)=>{

    setformData((currData)=>{
        // currData[fieldname]=newvalue;
        return {...currData, [ event.target.name]:event.target.value};
    }
    )
  }
  
let handelSubmit= async(event)=>{
  event.preventDefault();

  if(formData.password!==formData.conformpassword){

  }else{
    const dataResponse=await fetch(SummaryApi.signUP.url,{
      method : SummaryApi.signUP.method,
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify(formData),
    })
  
    const data= await dataResponse.json()

    if(data.success){
      toast.success(data.message)
      navigate("/Login")
    }
    if(data.error)
    {
      toast.error(data.message.errorResponse.errmsg)
    }
    setformData({
      name:"",
      email:"",
      password:"",
      conformpassword:"",
      profilepic:"",
      filename:"",
      
  })
 }
}


let handelUplodepic=async(event)=>{
  const file=event.target.files[0];
  const data=new FormData()

  data.append("file",file);
  data.append("upload_preset", "E-commercer");
  data.append("cloud_name", "di1e0egkt");


  try{
      const Res=await fetch('https://api.cloudinary.com/v1_1/di1e0egkt/image/upload',{

        method:"POST",
        body:data
      })
      .then((res)=>res.json())
       .then((data)=>{
         setformData((currData)=>{
           return {...currData, profilepic:data.url,filename:data.public_id};
       })})
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
     <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 py-5 w-full max-w-md  mx-auto rounded'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                 <div>
                 <Image className='sign-up-img' src={formData.profilepic|| loginIcon} alt="Image"/>
                 </div>
                <form>
                  <label htmlFor='profile'>
                  <div className='text-xs bg-slate-200 text-center py-3 absolute bottom-0 w-full bg-opacity-80 pb-4 pt-2 cursor-pointer'>
                  Uplode photo
                 </div>
                  </label>
                  <input type='file' id="profile" className='hidden' onChange={handelUplodepic}> 
                  
                  
                  </input>
                </form>
                </div>
                <form className='pt-6 flex-col gap-8' onSubmit={handelSubmit}>
                   
                <div className='grid'>
                        <label htmlFor="name">Name :</label>
                        <div className='bg-slate-200 p-2 rounded-full'>
                           <input 
                           type="text" 
                           id="name" 
                           name='username' 
                           placeholder='Enter your name' 
                           value={formData.username || ''} 
                           onChange={handelInputChange} 
                           className='w-full h-full  outline-none bg-transparent' required/>
                        </div>
                    </div>

                    <div className='grid'>
                        <label htmlFor="email">Email :</label>
                        <div className='bg-slate-200 p-2 rounded-full'>
                           <input 
                           type="email" 
                           id="email" 
                           name='email' 
                           placeholder='Enter email' 
                           value={formData.email || ''} 
                           onChange={handelInputChange} 
                           className='w-full h-full  outline-none bg-transparent' required/>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="password">Password :</label>
                       <div className='bg-slate-200 p-2 rounded-full flex items-center'>
                          <input 
                          id="password" 
                          name='password' 
                          value={formData.password || ''} 
                          type={showPassword?"text":"password"} 
                          onChange={handelInputChange} placeholder='Enter password'className='w-full h-full outline-none  bg-transparent' required/>
                          <div className='cursor-pointer'>
                            <span >
                                {
                                     showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />
                                }

                            </span>
                          </div>
                       </div>
                       </div>
                       <div>
                        <label htmlFor="conform-password">Conform-Password :</label>
                       <div className='bg-slate-200 p-2 rounded-full flex items-center'>
                          <input 
                          type='password'
                          id="conform-password" 
                          name='conformpassword' 
                          value={formData.conformpassword || ''} 
                          required
                          onChange={handelInputChange} placeholder='Enter password'className='w-full h-full outline-none  bg-transparent'/>

                       </div>
                      
                    </div>
                    <div/>
                    

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Sign-up</button>
                </form>
                <p className='my-4 '>Alredy have account?<Link to={'/login'} className='text-red-600 hover:underline hover:text-red-700 px-2'>Login</Link></p>

            </div>
        </div>
     </section>
    </div>
  )}



const Image = styled.img`
  filter: contrast(2);
`

export default SignUp
