import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setcurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const nextImage = () => {
    if (currentImage === desktopImages.length - 1) {
      setcurrentImage(0);
      return;
    }
    setcurrentImage((prev) => prev + 1);
  };
  const prevImage = () => {
    if (currentImage === 0) {
      setcurrentImage(desktopImages.length - 1);
      return;
    }
    setcurrentImage((prev) => prev - 1);
  };
  useEffect(()=>{
    const interval =setInterval(()=>{
        nextImage()
    },2000)
    return ()=>{
        // The global clearInterval() method cancels a timed, repeating action which was previously established by a call to setInterval(). If the parameter provided does not identify a previously established action, this method does nothing.
        clearInterval(interval)
    }
  },[currentImage])
  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full  flex items-center">
          <div className="md:flex justify-between items-center w-full text-2xl hidden ">
            <button
              className="bg-white shadow-md rounded-full p-1 mx-1"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1 mx-1"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* slider of desktop version */}
        <div className="md:flex h-full w-full overflow-hidden hidden">
          {desktopImages.map((image, index) => {
            return (
              <div
                className="w-full h-full flex min-w-full min-h-full transition-all"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={image} alt="banner" className="h-full w-full" />
              </div>
            );
          })}
        </div>

        {/**Mobile version slider */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((image, index) => {
            return (
              <div
                className="w-full h-full flex min-w-full min-h-full transition-all"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={image} alt="banner" className="h-full w-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
