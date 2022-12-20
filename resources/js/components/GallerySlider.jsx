import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper";
//import Project1 from "../assets/images/hero/1.png";
//import Project2 from "../assets/images/hero/2.png";
//import Project3 from "../assets/images/hero/3.png";
//import Project4 from "../assets/images/hero/4.png";
//import Project5 from "../assets/images/hero/5.png";
//import Tile1 from "../assets/images/tiles/2.png";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const GallerySlider = ({images}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  //const images = ["/client/assets/images/hero/1.png", "/client/assets/images/hero/2.png", "/client/assets/images/hero/3.png", "/client/assets/images/hero/4.png", "/client/assets/images/hero/5.png"];
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="gallerySlider">
      <Swiper
        freeMode
        slidesPerView="auto"
        spaceBetween={10}
        navigation
        modules={[FreeMode, Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="max-w-lg max-h-96 !h-auto pt-10"
              onClick={() => setShowPopup(true)}
            >
              <div className="h-full">
                <img className="w-full h-full object-cover" src={item.thumb_full_url} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
        <div className="flex absolute top-0 right-0 text-2xl z-30">
          <button ref={prevRef}>
            <BsArrowLeftCircle />
          </button>
          <button ref={nextRef} className="ml-2">
            <BsArrowRightCircle />
          </button>
        </div>
      </Swiper>
      <div
        className={`fixed w-screen h-screen top-0 left-0 z-50 flex items-center justify-center  bg-zinc-900/[0.8] transition-all duration-500 ${
          showPopup
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-60"
        }`}
      >
        <div className="wrapper relative">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute md:-top-20 -top-10 md:right-10 right-0 text-3xl text-white"
          >
            <IoMdClose />
          </button>
          <Swiper
            navigation
            modules={[Navigation]}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {images.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="max-h-[32rem] !h-auto pb-10"
                >
                  <div className="w-fit mx-auto h-full">
                    <img className=" h-full object-cover" src={item.full_url} alt="" />
                  </div>
                </SwiperSlide>
              );
            })}
            <div className="flex absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl text-white z-50 gap-5">
              <button ref={prevRef}>
                <BsArrowLeftCircle />
              </button>
              <button ref={nextRef}>
                <BsArrowRightCircle />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
