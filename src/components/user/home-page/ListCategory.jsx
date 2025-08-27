"use client"

import CategoryProduct from "@/models/CategoryProduct"
import { useQuery } from "react-query"
import { useRouter } from "next/navigation"
import { BEST_SELLING_PRODUCTS } from "@/utils/common-const"
import { Button } from "antd"

export default function ListCategory() {
  const router = useRouter()

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdminSearch"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 4,
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

  const listColorCate = ["geekblue", "pink", "orange", "green"]

  return (
    <div className="container mx-auto py-4 md:py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700 tracking-wide uppercase">Danh mục sản phẩm</h2>
      <div className="flex flex-wrap justify-center gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200 pb-2">
        {listCategory?.map((category, idx) => (
          <div
            key={category}
            onClick={() => {
              router.push(`/product-list/${category?.value}`)
            }}
            className="flex flex-col items-center bg-white rounded-lg bg-slate-200 transition-shadow duration-300 p-4 cursor-pointer group hover:bg-cyan-50 w-fit">
            <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-cyan-700 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {/* Fake icon: use emoji for demo, can replace with real icon */}
              <span className="text-3xl">{["🌱", "🐄", "🧪", "🛡️"][idx]}</span>
            </div>
            <Button color={listColorCate[idx]} variant="outlined" className="uppercase">
              {category?.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
