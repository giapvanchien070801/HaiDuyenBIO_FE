"use client"

import ListCartBanner from "@/components/user/home-page/ListCartBanner"
import UserSwiper from "@/components/user/common-component/UserSwiper"
import dynamic from "next/dynamic"
import ListCardProduct from "@/components/user/common-component/ListCardProduct"
import Image from "next/image"
import PricingBanner from "@/components/user/common-component/PricingBanner"
import AquacultureProbioticsList from "@/components/user/common-component/AquacultureProbioticsList"
import ListVideos from "@/components/user/common-component/ListVideos"
import { FloatButton } from "antd"
import { QuestionCircleOutlined, UpOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import ContactFloatingButtons from "@/components/user/common-component/ListContact"
import ListNewsHome from "@/components/user/common-component/ListNewsHome"
import ListCardProductHot from "@/components/user/common-component/ListCardProductHot"
import ListCategory from "@/components/user/home-page/ListCategory"

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowScrollTop(scrollTop > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      <div className="pb-48 ">
        <UserSwiper />
        <ListCategory />
        <ListCardProductHot />
        <ListCardProduct />

        {/* <AquacultureProbioticsList /> */}
        <PricingBanner />
        <ListNewsHome />
        <ListVideos />
      </div>

      {/* Nút scroll to top */}
      {showScrollTop && (
        <div
          className="fixed bottom-6 right-6 z-50 cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          onClick={scrollToTop}>
          <VerticalAlignTopOutlined className="text-2xl" />
        </div>
      )}

      <ContactFloatingButtons />
    </>
  )
}
