"use client"

import { Button, Spin } from "antd"
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons"
import TitleList from "./TitleList"
import CardProduct from "./CardProduct"
import { useQuery } from "react-query"
import Product from "@/models/Product"

export default function RelatedProducts({ currentCategoryId, currentProductId }) {
  const { data: listProduct, isFetching } = useQuery(
    ["getListRelatedProducts", currentCategoryId, currentProductId],
    async () => {
      const params = {
        categoryId: currentCategoryId,
        size: 10,
        page: 0,
        search: ""
      }

      const res = await Product.getProductList(params)
      const listRelatedProducts = res?.content?.filter(product => product.id !== +currentProductId)

      return listRelatedProducts
    },
    {
      enabled: !!currentCategoryId && !!currentProductId
    }
  )

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TitleList title="Sản phẩm liên quan" />
      <Spin spinning={isFetching}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {listProduct?.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      </Spin>
    </div>
  )
}
