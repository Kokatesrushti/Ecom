import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import productCategory from "../../helper/productCategary";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common/Index";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UploadProduct = ({ close, setclose ,fetchAllProducts}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [productImages, setProductImages] = useState([]);
  const [fullscreneImage, setFullScreenImage] = useState("");
  const [openfullscreen, setOpenFullScreen] = useState(false);



  const onSubmit = async (formdata) => {
    formdata.ProductImage = productImages;

    const response = await fetch(SummaryApi.uploadProduct.url,
      {
        method: SummaryApi.uploadProduct.method,
        credentials:"include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

    const data = await response.json(); 

    if(data.success){
      toast.success(data.message);
      fetchAllProducts()
      setclose(!close)
    }
    if(data.error){
      toast.error(data.message);
    }
    // You can perform further actions like sending the form data to the server
  };



  const handleImage = async (event) => {
    const data = new FormData();
    let file = event;
    data.append("file", file);
    data.append("upload_preset", "E-commercer");
    data.append("cloud_name", "di1e0egkt");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di1e0egkt/image/upload",
        {
          folder:'e-comfolder',
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      setProductImages((prevImages) => [
        ...prevImages,
        { url: result.url },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (index) => {
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed h-full w-full bg-black bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg px-3 py-2">Upload Product</h2>
          <div
            className="w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer px-2"
            onClick={() => {
              setclose(!close);
            }}
          >
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
                  value: 100,
                  message: "Product Name should be at max 100 characters",
                },
              })}
              className="bg-slate-100 p-2 border rounded"
              placeholder="Enter product name"
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
            >
              <option value="">Select...</option>
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
              {productImages.length >= 1 ? (
                <div className="flex items-center gap-2">
                  {productImages.map((el, index) => (
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
              })}
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
  );
};

export default UploadProduct;
