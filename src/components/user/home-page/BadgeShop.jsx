"use client"

import { ShoppingOutlined } from "@ant-design/icons"
import { Badge, Tooltip } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BadgeShop() {
  const [cartCount, setCartCount] = useState(0)

  // Tính toán tổng giá trị giỏ hàng từ localStorage
  const calculateCartTotal = () => {
    try {
      const listProducts = JSON.parse(localStorage.getItem("listProducts") || "[]")

      setCartCount(listProducts?.length)
    } catch (error) {
      setCartCount(0)
    }
  }

  useEffect(() => {
    calculateCartTotal()

    setInterval(() => {
      calculateCartTotal()
    }, 1000)
  }, [])

  return (
    <Link
      href={`/shopping/step1`}
      className="flex items-center justify-center hover:text-cyan-600 transition-all duration-300 bg-[#14457b] w-10 h-10 rounded">
      <Badge count={cartCount}>
        <Tooltip title="Giỏ hàng">
          <ShoppingOutlined className="text-2xl cursor-pointer flex text-white " />
        </Tooltip>
      </Badge>
    </Link>
  )
}
