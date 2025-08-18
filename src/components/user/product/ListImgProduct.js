"use client"
import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"

export default function ListImgProduct({ listImg = [] }) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        onBeforeInit={swiper => {
          // Gán lại DOM element cho navigation trước khi init
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        className="relative">
        {listImg?.map((slider, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img src={slider} className="!w-[500px] !h-[300px] lg:!h-[500px]" alt={`slider-${index}`} />
          </SwiperSlide>
        ))}

        {/* Nút chuyển slide */}
        <div ref={prevRef} className="  !left-2 z-10  ">
          <ArrowLeftOutlined className="swiper-button-prev" />
        </div>
        <div ref={nextRef} className="!right-2 z-10">
          <ArrowRightOutlined className="swiper-button-next" />
        </div>
      </Swiper>
    </div>
  )
}
