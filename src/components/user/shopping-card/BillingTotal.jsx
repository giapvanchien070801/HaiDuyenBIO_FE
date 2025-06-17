"use client";

import {
  CalculatorOutlined,
  CarOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

export default function BillingTotal({ setStep }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-4 flex items-center gap-2">
        <CalculatorOutlined />
        Thông Tin Hóa Đơn
      </h2>

      <div className="space-y-4">
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

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold flex items-center gap-2">
              <DollarOutlined />
              Tổng tiền:
            </span>
            <span className="text-xl font-bold text-red-600">2,380,000đ</span>
          </div>
        </div>

        <Button
          size="large"
          type="default"
          className="w-full bg-[#2cb1ab] text-white py-3 rounded-lg hover:bg-[#2cb1ab] transition duration-200 mt-6 flex items-center justify-center gap-2"
          onClick={() => {
            setStep("step2");
          }}
        >
          <ShoppingCartOutlined />
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
}
