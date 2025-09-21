"use client"

import CategoryProduct from "@/models/CategoryProduct"
import { useQuery } from "react-query"
import { useRouter } from "next/navigation"
import { BEST_SELLING_PRODUCTS } from "@/utils/common-const"
import { Button, Tag } from "antd"

export default function ListCategory() {
  const router = useRouter()

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdminSearchBanner"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 5,
        search: "",
        type: "PRODUCT"
      })

      const dataConvert = res?.content
        ?.filter(category => category?.id !== BEST_SELLING_PRODUCTS)
        .map(category => {
          return { label: category?.name, value: category?.id }
        })

      return dataConvert
    },
    {}
  )

  const listColorCate = [
    { color: "geekblue", icon: "/images/cate-1.png" },
    { color: "magenta", icon: "/images/cate-2.png" },
    { color: "orange", icon: "/images/cate-3.png" },
    { color: "cyan", icon: "/images/cate-4.png" }
  ]

  return (
    <div className="container-original  mx-auto py-4 md:py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700 tracking-wide uppercase">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-0 gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200 pb-2">
        {listCategory?.map((category, idx) => (
          <div
            style={{
              backgroundImage: `url(${listColorCate[idx].icon})`,
              objectFit: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}
            key={category}
            onClick={() => {
              router.push(`/product-list/${category?.value}`)
            }}
            className="h-[200px]  gap-4 flex flex-col items-center justify-end  rounded-lg transition-shadow duration-300 p-3 cursor-pointer group hover:bg-cyan-50">
            <Tag
              className="[&.ant-tag]:py-1 [&.ant-tag]:px-3 uppercase font-bold text-lg m-0"
              color={listColorCate[idx].color}>
              {category?.label}
            </Tag>
          </div>
        ))}
      </div>
    </div>
  )
}
