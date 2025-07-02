"use client"

import {
  CalculatorOutlined,
  CarOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
  CreditCardOutlined
} from "@ant-design/icons"
import { Button, Table } from "antd"
import { useState, useEffect } from "react"

export default function BillingDetailsStep2({ setStep, form }) {
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)

  // Load selected products from localStorage
  useEffect(() => {
    const savedSelectedProducts = localStorage.getItem("selectedProducts")
    if (savedSelectedProducts) {
      const selectedProducts = JSON.parse(savedSelectedProducts)

      // Transform data for table display
      const transformedItems = selectedProducts.map(product => ({
        key: product.id.toString(),
        name: product.name,
        quantity: product.quantity,
        price: formatPrice(product.price),
        total: formatPrice(product.price * product.quantity)
      }))

      setCartItems(transformedItems)

      // Calculate subtotal
      const calculatedSubtotal = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)

      setSubtotal(calculatedSubtotal)
      setTotal(calculatedSubtotal)
    }
  }, [])

  // Load buyNow products from localStorage
  useEffect(() => {
    const savedBuyNowProducts = localStorage.getItem("selectedProducts")
    if (savedBuyNowProducts) {
      const selectedProducts = JSON.parse(savedBuyNowProducts)

      // Transform data for table display
      const transformedItems = selectedProducts.map(product => ({
        key: product.id.toString(),
        name: product.name,
        quantity: 1,
        price: formatPrice(product.price),
        total: formatPrice(product.price)
      }))

      setCartItems(transformedItems)

      // Calculate subtotal
      const calculatedSubtotal = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)

      setSubtotal(calculatedSubtotal)
      setTotal(calculatedSubtotal)
    }
  }, [])

  const formatPrice = price => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price)
  }

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total"
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-4 flex items-center gap-2">
        <CalculatorOutlined />
        Chi Tiết Đơn Hàng
      </h2>

      <div className="space-y-6">
        <Table
          dataSource={cartItems}
          columns={columns}
          pagination={{
            pageSize: 5,
            showTotal: total => `Tổng ${total} sản phẩm`
          }}
          className="border rounded-lg"
        />

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <ShoppingCartOutlined />
              Tạm tính:
            </span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <CarOutlined />
              Phí vận chuyển:
            </span>
            <span className="font-medium">...</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold flex items-center gap-2">
                <DollarOutlined />
                Tổng tiền:
              </span>
              <span className="text-xl font-bold text-red-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
          <CreditCardOutlined className="text-blue-500 mt-1" />
          <span className="text-blue-700">Trả tiền mặt khi nhận hàng</span>
        </div>

        <Button
          onClick={() => {
            // setStep("step3");
            form.submit()
          }}
          size="large"
          type="default"
          className="w-full bg-[#2cb1ab] text-white py-3 rounded-lg hover:bg-[#2cb1ab] transition duration-200 flex items-center justify-center gap-2">
          <ShoppingCartOutlined />
          Đặt hàng
        </Button>

        <div className="text-gray-500 text-sm flex items-start gap-2">
          <InfoCircleOutlined className="mt-1" />
          <p>
            Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng của bạn, hỗ trợ trải nghiệm của bạn trên toàn bộ
            trang web này và cho các mục đích khác được mô tả trong chính sách bảo mật của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  )
}
