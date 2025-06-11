"use client";

import { Button } from "antd";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import TitleList from "./TitleList";
import CardProduct from "./CardProduct";

export default function AquacultureProbioticsList() {
  const products = [
    {
      id: 1,
      name: "Men vi sinh Bifido",
      image: "/images/product1.jpg",
      price: 450000,
      oldPrice: 500000,
      discount: 10,
    },
    {
      id: 2,
      name: "Men vi sinh Lacto",
      image: "/images/product1.jpg",
      price: 380000,
      oldPrice: 420000,
      discount: 15,
    },
    {
      id: 3,
      name: "Men vi sinh Premium",
      image: "/images/product1.jpg",
      price: 550000,
      oldPrice: 600000,
      discount: 8,
    },
    {
      id: 4,
      name: "Men vi sinh Plus",
      image: "/images/product1.jpg",
      price: 420000,
      oldPrice: 460000,
      discount: 12,
    },
    {
      id: 5,
      name: "Men vi sinh Gold",
      image: "/images/product1.jpg",
      price: 480000,
      oldPrice: 520000,
      discount: 8,
    },
    {
      id: 6,
      name: "Men vi sinh Extra",
      image: "/images/product1.jpg",
      price: 400000,
      oldPrice: 450000,
      discount: 11,
    },
    {
      id: 7,
      name: "Men vi sinh Advanced",
      image: "/images/product1.jpg",
      price: 520000,
      oldPrice: 580000,
      discount: 10,
    },
    {
      id: 8,
      name: "Men vi sinh Ultra",
      image: "/images/product1.jpg",
      price: 600000,
      oldPrice: 650000,
      discount: 8,
    },
    {
      id: 9,
      name: "Men vi sinh Pro",
      image: "/images/product1.jpg",
      price: 470000,
      oldPrice: 510000,
      discount: 8,
    },
    {
      id: 10,
      name: "Men vi sinh Max",
      image: "/images/product1.jpg",
      price: 550000,
      oldPrice: 600000,
      discount: 8,
    },
    {
      id: 11,
      name: "Men vi sinh Elite",
      image: "/images/product1.jpg",
      price: 580000,
      oldPrice: 630000,
      discount: 8,
    },
    {
      id: 12,
      name: "Men vi sinh Supreme",
      image: "/images/product1.jpg",
      price: 620000,
      oldPrice: 680000,
      discount: 9,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <TitleList title="Vi sinh xử lý nước" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
