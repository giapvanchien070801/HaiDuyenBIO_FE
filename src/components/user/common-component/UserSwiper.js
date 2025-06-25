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
    "/images/vi-sinh-xu-ly-nuoc-min_banner1.jpg",
    "/images/sieu-men-duong-ruot-min_banner2.jpg",
    "/images/men-i-sinh-xu-ly-ao-nuoi-min_banner_3.jpg",
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
      }}>
      {listSliderFake?.map((slider, index) => (
        <SwiperSlide key={index}>
          <img src={slider} className="w-full slide-height" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
