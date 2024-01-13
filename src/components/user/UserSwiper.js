"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import { handleSrcImg } from "@/app/(admin)/common/functions/commonFunction";

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
      {listSlider?.map((slider, index) => (
        <SwiperSlide key={index}>
          <img
            src={handleSrcImg(slider)}
            className="w-full"
            style={{ height: "620px" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
