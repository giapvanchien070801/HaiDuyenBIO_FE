"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function UserSwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="/images/blog1.jpg" className="w-full h-full"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/blog1.jpg" className="w-full h-full"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/blog1.jpg" className="w-full h-full"/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/blog1.jpg" className="w-full h-full"/>
      </SwiperSlide>
    </Swiper>
  );
}
