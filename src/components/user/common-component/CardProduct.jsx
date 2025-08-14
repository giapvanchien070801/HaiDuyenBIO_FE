"use client"

import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Button, message, Tooltip } from "antd"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function CardProduct(props) {
  const { product } = props
  const [listProducts, setListProducts] = useState([])
  const router = useRouter()

  // Load listProducts from localStorage on component mount
  useEffect(() => {
    const savedListProducts = localStorage.getItem("listProducts")
    if (savedListProducts) {
      setListProducts(JSON.parse(savedListProducts))
    }
  }, [])

  // Function to add product to listProducts
  const addToCart = () => {
    const existingListProducts = localStorage.getItem("listProducts")
    let currentListProducts = existingListProducts ? JSON.parse(existingListProducts) : []

    // Check if product already exists in listProducts
    const existingProductIndex = currentListProducts.findIndex(item => item.id === product.id)

    if (existingProductIndex !== -1) {
      // If product exists, increase quantity
      currentListProducts[existingProductIndex].quantity += 1
    } else {
      // If product doesn't exist, add new product with quantity 1
      currentListProducts.push({
        ...product,
        quantity: 1
      })
    }

    // Save updated listProducts to localStorage
    localStorage.setItem("listProducts", JSON.stringify(currentListProducts))
    setListProducts(currentListProducts)

    // Show success message
    message.success("Đã thêm sản phẩm vào giỏ hàng!")
  }

  return (
    <>
      <div
        onClick={() => {
          router.push(`/product-detail/${product?.id}`)
        }}
        className="  cursor-pointer bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative hover:shadow-lg transition-shadow duration-300 card-product">
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm z-10">
          -{product?.discountPercent}%
        </div>
        <div className="flex justify-center items-center">
          <div className="overflow-hidden w-52  h-44 md:h-52 ">
            <img
              src={product?.imageUrl ? product?.imageUrl[0] : "/images/product1.png"}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <Tooltip title={product?.name}>
            <h1
              className="text-center sm:text-left font-semibold 
            text-base sm:text-lg mb-1 md:mb-2 h-6 md:h-14 line-clamp-1 md:line-clamp-2">
              {product?.name}
            </h1>
          </Tooltip>
          <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-2 mb-1 md:mb-3 sm:mb-4">
            <span className="text-red-500 font-bold text-sm sm:text-lg lg:text-xl">
              {product?.priceFrom?.toLocaleString("vi-VN")}đ
            </span>
            <span className="text-gray-400 line-through text-xs sm:text-sm">
              {product?.price?.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              className="flex-1 text-sm sm:text-base p-0 md:px-1 md:py-2"
              onClick={e => {
                e.stopPropagation()
                addToCart()
              }}>
              Thêm vào giỏ
            </Button>
            <Button
              onClick={e => {
                e.stopPropagation()
                router.push(`/shopping/step2`)
                localStorage.setItem("selectedProducts", JSON.stringify([{ ...product, quantity: 1 }]))
              }}
              //   type="primary"
              className="flex-1 !bg-[#2cb1ab] text-sm sm:text-base text-white  p-0 md:px-1 md:py-2"
              icon={<ShoppingOutlined />}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
