"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import { handleSrcImg } from "@/common/functions/commonFunction";

export default function UserSwiper() {
  const { data: listSlider } = useQuery(
    ["getListSliderUser"],
    async () => {
      const res = await Base.getAllSlider();
      const listSliderString = res?.map((slider) => slider?.ImagePath);
      return listSliderString;
    },
    {}
  );
  const listSliderFake = [
    "https://haiduyenbio.com/wp-content/uploads/2024/07/vi-sinh-xu-ly-nuoc-min.jpg",
    "https://haiduyenbio.com/wp-content/uploads/2024/07/sieu-men-duong-ruot-min.jpg",
    "https://haiduyenbio.com/wp-content/uploads/2024/07/men-i-sinh-xu-ly-ao-nuoi-min.jpg",
  ];
  // handleSrcImg(slider)
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Autoplay]}
      effect="coverflow"
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
    >
      {listSliderFake?.map((slider, index) => (
        <SwiperSlide key={index}>
          <img src={slider} className="w-full slide-height" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
