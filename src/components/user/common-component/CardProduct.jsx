"use client";

import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function CardProduct(props) {
  const { product } = props;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden relative hover:shadow-lg transition-shadow duration-300 card-product">
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm z-10">
          -{product.discount}%
        </div>
        <div className="px-2 py-4 overflow-hidden  h-44 sm:h-52 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">
            {product.name}
          </p>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-red-500 font-bold text-lg sm:text-xl">
              {product.price.toLocaleString("vi-VN")}đ
            </span>
            <span className="text-gray-400 line-through text-xs sm:text-sm">
              {product.oldPrice.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              className="flex-1 text-sm sm:text-base px-1"
            >
              Thêm vào giỏ
            </Button>
            <Button
              //   type="primary"
              className="flex-1 !bg-[#2cb1ab] text-sm sm:text-base px-1 text-white"
              icon={<ShoppingOutlined />}
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
