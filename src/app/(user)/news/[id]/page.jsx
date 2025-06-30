"use client"

import { HomeOutlined } from "@ant-design/icons"
import BannerBreadcrumb from "@/components/user/common-component/BannerBreadcrumb"
import { useQuery } from "react-query"
import Base from "@/models/Base"
import SidebarUser from "@/components/user/common-component/SidebarUser"
import { Breadcrumb, Pagination, Spin } from "antd"
import UserSwiper from "@/components/user/common-component/UserSwiper"
import ListCardProduct from "@/components/user/common-component/ListCardProduct"
import CardProduct from "@/components/user/common-component/CardProduct"
import TextEditor from "@/components/admin/common/TextEditor"
import { useState } from "react"
import TitleList from "@/components/user/common-component/TitleList"

export default function ProductDetailPage({ params }) {
  // Sử dụng query param từ URL
  const idProduct = params?.id
  const [valueTextEditor, setValueTextEditor] = useState("")

  const { data: dataProduct, isFetching } = useQuery(
    ["getDetailProduct", idProduct],
    async () => {
      const res = await Base.getDetailProduct(idProduct)

      return res
    },
    { enabled: !!idProduct }
  )

  const products = [
    {
      id: 1,
      name: "Men vi sinh Bifido",
      image: "/images/product1.jpg",
      price: 450000,
      oldPrice: 500000,
      discount: 10
    },
    {
      id: 2,
      name: "Men vi sinh Lacto",
      image: "/images/product1.jpg",
      price: 380000,
      oldPrice: 420000,
      discount: 15
    },
    {
      id: 3,
      name: "Men vi sinh Premium",
      image: "/images/product1.jpg",
      price: 550000,
      oldPrice: 600000,
      discount: 8
    },
    {
      id: 4,
      name: "Men vi sinh Plus",
      image: "/images/product1.jpg",
      price: 420000,
      oldPrice: 460000,
      discount: 12
    },
    {
      id: 5,
      name: "Men vi sinh Gold",
      image: "/images/product1.jpg",
      price: 480000,
      oldPrice: 520000,
      discount: 8
    },
    {
      id: 6,
      name: "Men vi sinh Extra",
      image: "/images/product1.jpg",
      price: 400000,
      oldPrice: 450000,
      discount: 11
    },
    {
      id: 7,
      name: "Men vi sinh Advanced",
      image: "/images/product1.jpg",
      price: 520000,
      oldPrice: 580000,
      discount: 10
    },
    {
      id: 8,
      name: "Men vi sinh Ultra",
      image: "/images/product1.jpg",
      price: 600000,
      oldPrice: 650000,
      discount: 8
    },
    {
      id: 9,
      name: "Men vi sinh Pro",
      image: "/images/product1.jpg",
      price: 470000,
      oldPrice: 510000,
      discount: 8
    },
    {
      id: 10,
      name: "Men vi sinh Max",
      image: "/images/product1.jpg",
      price: 550000,
      oldPrice: 600000,
      discount: 8
    },
    {
      id: 11,
      name: "Men vi sinh Elite",
      image: "/images/product1.jpg",
      price: 580000,
      oldPrice: 630000,
      discount: 8
    },
    {
      id: 12,
      name: "Men vi sinh Supreme",
      image: "/images/product1.jpg",
      price: 620000,
      oldPrice: 680000,
      discount: 9
    }
  ]

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
          <span className="text-[#2490eb]">Bài viết 11</span>
        </>
      )
    }
  ]

  return (
    <div className="  pb-24">
      {/* <UserSwiper /> */}

      <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-0 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />

          <TitleList title="Bài viết 11" />
          <Spin spinning={false}>
            <div dangerouslySetInnerHTML={{ __html: valueTextEditor }} className="blog-content my-5" />
            <TextEditor
              onChange={value => {
                setValueTextEditor(value)
              }}
              valueDetail={valueTextEditor}
            />
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
  )
}
