"use client";

import {
  CalculatorOutlined,
  CarOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import { useState } from "react";

export default function BillingDetailsStep2({ setStep }) {
  const cartItems = [
    {
      key: "1",
      name: "Sản phẩm 1",
      quantity: 2,
      price: "1,175,000đ",
      total: "2,350,000đ",
    },
  ];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
    },
  ];

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
          pagination={false}
          className="border rounded-lg"
        />

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <ShoppingCartOutlined />
              Tạm tính:
            </span>
            <span className="font-medium">2,350,000đ</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-2">
              <CarOutlined />
              Phí vận chuyển:
            </span>
            <span className="font-medium">30,000đ</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold flex items-center gap-2">
                <DollarOutlined />
                Tổng tiền:
              </span>
              <span className="text-xl font-bold text-red-600">2,380,000đ</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
          <CreditCardOutlined className="text-blue-500 mt-1" />
          <span className="text-blue-700">Trả tiền mặt khi nhận hàng</span>
        </div>

        <Button
          onClick={() => {
            setStep("step3");
          }}
          size="large"
          type="default"
          className="w-full bg-[#2cb1ab] text-white py-3 rounded-lg hover:bg-[#2cb1ab] transition duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCartOutlined />
          Đặt hàng
        </Button>

        <div className="text-gray-500 text-sm flex items-start gap-2">
          <InfoCircleOutlined className="mt-1" />
          <p>
            Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng của bạn,
            hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này và cho các mục
            đích khác được mô tả trong chính sách bảo mật của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
