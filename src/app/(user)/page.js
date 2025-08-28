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
  return (
    <>
      <div className="pb-32 ">
        <UserSwiper />
        <ListCategory />
        <ListCardProductHot />
        <ListCardProduct />

        {/* <AquacultureProbioticsList /> */}
        {/* <PricingBanner /> */}
        <ListNewsHome />
        <ListVideos />
      </div>
    </>
  )
}
