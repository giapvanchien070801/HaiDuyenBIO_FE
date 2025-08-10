"use client"

import CategoryProduct from "@/models/CategoryProduct"
import { useQuery } from "react-query"
import { useRouter } from "next/navigation"

export default function ListCategory() {
  const router = useRouter()

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdminSearch"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 1000,
        search: "",
        type: "ARTICLE"
      })

      const dataConvert = res?.content?.map(category => {
        return { label: category?.name, value: category?.id }
      })
      return dataConvert
    },
    {}
  )
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700 tracking-wide uppercase">Danh mục sản phẩm</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-200 pb-2">
        {listCategory?.map((category, idx) => (
          <div
            key={category}
            onClick={() => {
              router.push(`/news/${category.value}`)
            }}
            className="flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer group hover:bg-cyan-50 w-fit">
            <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-cyan-700 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {/* Fake icon: use emoji for demo, can replace with real icon */}
              <span className="text-3xl">{["🐟", "🐄", "🌱", "💊", "🌿", "🧪", "🛡️", "⚙️"][idx % 8]}</span>
            </div>
            <span className="text-base font-semibold text-gray-700 group-hover:text-cyan-700 text-center">
              {category}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
