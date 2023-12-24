"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function UserSwiper() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay]}
      effect="coverflow"
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <img
          src="/images/slide1.jpg"
          className="w-full"
          style={{ height: "620px" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slide2.jpg"
          className="w-full"
          style={{ height: "620px" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slide3.jpg"
          className="w-full"
          style={{ height: "620px" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
