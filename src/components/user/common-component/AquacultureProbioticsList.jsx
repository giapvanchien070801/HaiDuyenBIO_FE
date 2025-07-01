"use client"

import { Button, Spin } from "antd"
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons"
import TitleList from "./TitleList"
import CardProduct from "./CardProduct"
import { useQuery } from "react-query"
import Product from "@/models/Product"

export default function AquacultureProbioticsList() {
  const { data: listProduct, isFetching } = useQuery(
    ["getListAquacultureProbiotics"],
    async () => {
      const params = {
        categoryId: 14,
        size: 10,
        page: 0,
        search: ""
      }

      const res = await Product.getProductList(params)

      return res?.content
    },
    {
      enabled: true
    }
  )

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TitleList title="Vi sinh xử lý nước" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <Spin spinning={isFetching}>
          {listProduct?.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
        </Spin>
      </div>
    </div>
  )
}
