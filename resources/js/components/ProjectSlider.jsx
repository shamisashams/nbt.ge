import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, FreeMode } from "swiper";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
import { FaRegEye } from "react-icons/fa";

const ProjectSlider = ({ data }) => {
  return (
    <>
      <div className="">
        <Swiper
          scrollbar
          freeMode
          slidesPerView={4}
          spaceBetween={20}
          modules={[Scrollbar, FreeMode]}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            900: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index} className="pb-10">
                <div className="text-center group">
                  <Link
                    href={route('client.product.show',item.slug)}
                    className="w-full h-64 mb-5 block relative"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={item.latest_image?item.latest_image.full_url:null}
                      alt=""
                    />
                    <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center bg-white/[0.3] text-white text-3xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <FaRegEye />
                    </div>
                  </Link>
                  <div className="bold">{item.title}</div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProjectSlider;
