import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from "./Logo";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SummaryApi from "../common/Index";
import { toast } from "react-toastify";
import { setUserDetails } from '../store/userSlice';
import { useContext, useState } from 'react';
import Context from '../context';


export default function Header(){
    //                               payload
    //useSelector is use to get value from the store
    const user = useSelector(state => state?.user?.user)
    const [menuDisplay,setMenuDisplay]=useState(false)
    const context =useContext(Context)
    const navigate=useNavigate()
    const location = useLocation();


    const getSearchQuery = (input) => {
        const params = new URLSearchParams(input);
        return params.get('q') || '';
    };

    const [search, setSearch] = useState(getSearchQuery(location.search));


    const dispatch=useDispatch()
    const handellogout=async()=>{
        let res=await fetch(SummaryApi.logout.url,{
            method:SummaryApi.method,
            credentials:'include'
        })
        let data=await res.json()
        if(data.success){
            toast.success(data.message)
            //useDispatch is use to execute functions declared in store
            dispatch(
                setUserDetails(null)
            )
        }
        if(data.error){
            toast.error(data.message)
        }
    }

    const handelsearch=(e)=>{
        const {value} = e.target
        setSearch(value)
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate('/search')
        }
    }

    return(
        <header className="h-16 shadow-sm bg-white fixed z-40 w-full">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div>
                    <Link to="/" ><Logo w={90} h={50}/></Link>
                    
                </div>
                <div className="hidden lg:flex items-center w-full max-w-sm border rounded-full justify-between focus-within:shadow pl-2">
                    <input  onChange={handelsearch} type="text" placeholder="Search Product here..." className="w-full outline-none" value={search}/>
                    <div className="text-lg min-w-[50px] h-8 flex justify-center items-center bg-red-600 rounded-r-full text-white">
                        <IoSearchOutline />
                    </div>
                </div>


                <div className=" flex gap-7 justify-center items-center">

                  <div className='relative flex justify-center'>
                  <div className="text-3xl cursor-pointer relative flex justify-center rounded-full" onClick={()=>setMenuDisplay(!menuDisplay)}>
                 
                   {user?.profilePic?.url?<Image src={user.profilePic.url} className="userLogo rounded-full"/>:<FaRegUser />}
                   </div>
                   {
                    menuDisplay && ( 
                        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded  '>
                        <nav>
                            {
                                user?.role === 'ADMIN' &&(
                                    <Link to={"admin-panel"} className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block" onClick={()=>setMenuDisplay(!menuDisplay)} >Admin Panel</Link>
                                )
                            }
                        <div className='flex justify-center'>
                        {
                            <Link className="whitespace-nowrap hover:bg-slate-100 p-2 " to={'/order'}>Order</Link>
                        }
                        </div>
                        </nav>
                       </div>
                       
                    )
                   }
                  
                  </div>

                  {
                    user?._id && (
                        <Link to={"cart"} className="text-2xl relative">
                        <span>
                         <FaShoppingCart />
                        </span>
                        
                         <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex justify-center items-center absolute bottom-3 left-4">
                             <p className="text-xs">{context?.cartproduct}</p>
                         </div>
                        </Link>
                    )
                  }

                   <div>
                    {
                        user?._id ?(
                            <button onClick={handellogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700" >Logout</button>
                        ):
                        (<Link className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700" to="/Login">Login</Link>)
                    }
                   </div>
                </div>

            </div>
        </header>
    )
}

const Image = styled.img`

border: 1px solid;
  object-fit: contain;
  height: 2.5rem;
  width: 2.5rem;

`