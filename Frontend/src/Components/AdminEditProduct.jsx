import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import productCategory from "../../helper/productCategary";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common/Index";
import { toast } from "react-toastify";
import { useEffect } from 'react';



const AdminEditProduct = ({ setEditProduct,editProduct ,product,fetchAllProducts}) => {
  {
    var image=product.ProductImage
  }

  const [data,setData]=useState({
    productName : product?.productName,
    brandName : product?.brandName,
    productCategory : product?.category,
    ProductImage: image,
    description : product?.description,
    price : product?.price,
    sellingprice: product?.sellingprice,
    _id : product?._id
  })


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const [productImages, setProductImages] = useState(data.ProductImage);
      const [fullscreneImage, setFullScreenImage] = useState("");
      const [openfullscreen, setOpenFullScreen] = useState(false);
      useEffect(() => {
        setData((prevData) => ({
          ...prevData,
          ProductImage: productImages
        }));
      }, [productImages]);
    
      const onSubmit = async (formdata) => {
        data.ProductImage = productImages;

        const response = await fetch(SummaryApi.updateProduct.url,
          {
            method: SummaryApi.updateProduct.method,
            credentials:"include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
        const res = await response.json(); 

    
        if(res.success){
          toast.success(res.message);
          setEditProduct(!editProduct)
          fetchAllProducts()
        }
        if(res.error){
          toast.error(res.message);
        }
        // You can perform further actions like sending the form data to the server
      };
    
      const handleImage = async (event) => {
       
        const newimage = new FormData();
        let file = event;
        newimage.append("file", file);
        newimage.append("upload_preset", "E-commercer");
        newimage.append("cloud_name", "di1e0egkt");
        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/di1e0egkt/image/upload",
            {
              method: "POST",
              body: newimage,
            }
          );
          const result = await res.json();
          setProductImages((prevImages) => [
            ...prevImages,
            { url: result.url },
          ]);

          data.ProductImage = productImages;
         

        } catch (err) {
          console.log(err);
        }
      };
    
      const handleDelete = (index) => {
        setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
        data.ProductImage = productImages;
      };
      const handelonChange=(e)=>{
        const {name,value}=e.target
        setData((prev)=>{
          return{
            ...prev,
            [name]:value
          }
        })
      }
  return (

    
    <div className='fixed bottom-0 top-0 left-0 right-0 bg-black bg-opacity-30  flex justify-center'>
      
    <div className="fixed h-full w-full  top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg px-3 py-2">Edit Product</h2>
          <div
            className="w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer px-2"
            onClick={()=>setEditProduct(!editProduct)}>
            <IoIosClose />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid p-4 h-full">
          <div className="grid p-4 overflow-y-scroll h-full">
            <label htmlFor="productName">Product Name:</label>
            <input
              id="productName"
              type="text"
              {...register("productName", {
                required: { value: true, message: "Product Name is required" },
                minLength: {
                  value: 4,
                  message: "Product Name should be at least 4 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Product Name should be at max 15 characters",
                },
              })}
              value={data.productName}
              className="bg-slate-100 p-2 border rounded"
              placeholder="Enter product name"
              onChange={handelonChange}
            />
            {errors.productName && (
              <p className="text-red-500">{errors.productName.message}</p>
            )}

            <label htmlFor="brandName" className="mt-3">
              Brand Name:
            </label>
            <input
              id="brandName"
              type="text"
              {...register("brandName", {
                required: { value: true, message: "Brand name is required" },
                minLength: {
                  value: 4,
                  message: "Brand name should be at least 4 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Brand name should be at max 15 characters",
                },
              })}
              value={data.brandName}
              onChange={handelonChange}
              className="bg-slate-100 p-2 border rounded"
              placeholder="Enter Brand Name"
            />
            {errors.brandName && (
              <p className="text-red-500">{errors.brandName.message}</p>
            )}

            <label htmlFor="category" className="mt-3">
              Category:
            </label>
            <select
              {...register("category")}
              className="bg-slate-100 p-2 border rounded"
              onChange={handelonChange}
            >
              <option value="">{data.productCategory}</option>
              {productCategory.map((el, index) => (
                <option key={index} value={el.label}>
                  {el.label}
                </option>
              ))}
            </select>

            <label htmlFor="productImage" className="mt-3">
              Product Image:
            </label>
            <label htmlFor="uploadImage">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImage"
                    className="hidden"
                    {...register("ProductImage", {
                      required: {
                        value: true,
                        message: "Product Image is required",
                      },
                    })}
                    onChange={(e) => handleImage(e.target.files[0])}
                  />
                </div>
              </div>
            </label>
            <div>
              {data.ProductImage.length >= 1 ? (
                <div className="flex items-center gap-2">
                  {data.ProductImage.map((el, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={el.url}
                        width={80}
                        height={80}
                        alt="Product Image"
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setFullScreenImage(el.url);
                          setOpenFullScreen(true);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 bg-rose-600 rounded-full text-white hidden group-hover:block cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600 text-xs">
                  *Please upload product image
                </p>
              )}
            </div>

            <label htmlFor="price" className="mt-3">
              Price:
            </label>
            <input
              id="price"
              type="number"
              {...register("price", {
                required: { value: true, message: "Price is required" },
                minLength: {
                  value: 1,
                  message: "Minimum price is 1rs.",
                },
              })}
              onChange={handelonChange}
              value={data.price}
              className="bg-slate-100 p-2 border rounded"
              placeholder="Enter Price"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}

            <label htmlFor="sellingprice" className="mt-3">
              Selling Price:
            </label>
            <input
              id="sellingprice"
              type="number"
              {...register("sellingprice", {
                required: { value: true, message: "Selling Price is required" },
                minLength: {
                  value: 1,
                  message: "Minimum price is 1rs.",
                },
              })} onChange={handelonChange}
              value={data.sellingprice}
              className="bg-slate-100 p-2 border rounded"
              placeholder="Enter Selling Price"
            />
            {errors.sellingprice && (
              <p className="text-red-500">{errors.sellingprice.message}</p>
            )}

            <label htmlFor="description" className="mt-3">
            Description:
            </label>
            <textarea 
              rows={3} 
              id="description"
              type="number"
              {...register("description", {
                required: { value: true, message: "Description is required" },
                minLength: {
                  value: 10,
                  message: "Minimum length of description cant be less then 10 char.",
                },
              })}
              onChange={handelonChange}
              value={data.description}
              className="h-28 bg-slate-100 p-2 border rounded resize-none"
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <input
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-2 mb-10 cursor-pointer"
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
      {openfullscreen && (
        <DisplayImage
          openfullscreen={openfullscreen}
          setOpenFullScreen={setOpenFullScreen}
          imageurl={fullscreneImage}
        />
      )}
    </div>
  
    </div>
  )
}

export default AdminEditProduct
