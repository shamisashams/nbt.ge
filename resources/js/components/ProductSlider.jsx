import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { FreeMode } from "swiper";
//import { Link } from "react-router-dom";
import { Link, usePage } from '@inertiajs/inertia-react'
//import { products } from "./Data";
import { ProductBox } from "./Shared";

const ProductSlider = ({products}) => {
  return (
    <div>
      <Swiper
        freeMode
        slidesPerView={5}
        spaceBetween={30}
        modules={[FreeMode]}
        breakpoints={{
          1200: {
            slidesPerView: 5,
          },
          1000: {
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
        {products.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ProductBox
                key={index}
                link={route('client.product.show',item.slug)}
                img={item.latest_image?item.latest_image.thumb_full_url:null}
                name={item.attributes.color}
                size={item.attributes.size}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
