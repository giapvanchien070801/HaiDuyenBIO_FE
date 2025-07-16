"use client"

import { HomeOutlined } from "@ant-design/icons"
import BannerBreadcrumb from "@/components/user/common-component/BannerBreadcrumb"
import { useQuery } from "react-query"
import Base from "@/models/Base"
import CardDoctor from "@/components/user/CardDoctor"
import { Breadcrumb, Spin } from "antd"
import ListVideos from "@/components/user/common-component/ListVideos"
import FilesRepository from "@/models/FilesRepository"

export default function ListVideosPage() {
  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      )
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Danh sách Videos</span>
        </>
      )
    }
  ]

  return (
    <div className=" flex flex-col items-center mb-36 ">
      <div className=" container-original  pb-0  sm:mt-10 mt-5 lg:mt-16">
        <Breadcrumb items={breadcrumb} className="my-5 mx-4 lg:mx-0" />

        <div className="flex gap-4 flex-wrap md:px-0 px-4 justify-center">
          <ListVideos />
        </div>
      </div>
    </div>
  )
}
