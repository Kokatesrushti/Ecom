import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider,createBrowserRouter } from 'react-router-dom'
// import router from './routes/index.js'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import ForgotPassword from './Pages/ForgotPassword.jsx'
import SignUp from './Pages/SignUp.jsx'
import { Provider } from 'react-redux'
import {store} from './store/Store.jsx'
import Admin from './Pages/Admin.jsx'
import AllUsers from './Pages/Allusers.jsx'
import AllProducts from './Pages/AllProducts.jsx' 
import CategoryProduct from './Pages/CategoryProduct.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'
import Cart from './Pages/Cart.jsx'
import SearchProduct from './Pages/SearchProduct.jsx'
import Succes from './Pages/Succes.jsx'
import Cancel from './Pages/Cancel.jsx'
import OrderPage from './Pages/OrderPage.jsx'

//if new page to render include path here
const router = createBrowserRouter([

  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'Login',
        element:<Login/>
      },
      {
        path:'forgot-Password',
        element:<ForgotPassword/>
      },
      {
        path:"sign-up",
        element:<SignUp/>
      },
      {
        path:"admin-panel",
        element:<Admin/>,
      },
      {
        path:"admin-panel",
        element:<Admin/>,
        children:[
          {
            path:"all-users",
            element:<AllUsers/>,
            
          },
          {
            path:"all-product",
            element:<AllProducts/>,
          }
        ]
      },
      {
        path:"product-category/:categoryName",
        element:<CategoryProduct/>
      },
      {
        path:"product/:id",
        element:<ProductDetails/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"*",
        element:<h1>Page not found</h1>
      },
      {
        path:"search",
        element:<SearchProduct/>
      },
      {
        path:"success",
        element:<Succes/>
      },
      {
        path:"cancel",
        element:<Cancel/>
      },
      {
        path:"/order",
        element:<OrderPage/>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)



