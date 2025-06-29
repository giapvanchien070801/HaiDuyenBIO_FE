"use client";

import { Breadcrumb } from "antd";

export default function ListCartBanner() {
  const cardData = [
    {
      id: 1,
      image: "/images/thuong-hieu.png",
      title: "Công nghệ Nhật Bản",
      description:
        "Sử dụng công nghệ tiên tiến từ Nhật Bản, đảm bảo hiệu quả vượt trội.",
    },
    {
      id: 2,
      image: "/images/thuong-hieu.png",
      title: "Chất lượng hàng đầu",
      description: "Cam kết cung cấp sản phẩm men vi sinh chất lượng cao.",
    },
    {
      id: 3,
      image: "/images/thuong-hieu.png",
      title: "Chuyên gia tư vấn",
      description:
        "Đội ngũ chuyên gia giàu kinh nghiệm luôn sẵn sàng tư vấn và hỗ trợ.",
    },
    {
      id: 4,
      image: "/images/thuong-hieu.png",
      title: "Giao hàng toàn quốc",
      description: "Dịch vụ giao hàng nhanh chóng và tiện lợi trên toàn quốc.",
    },
  ];

  return (
    <div className="bg-gray-100 flex flex-col items-center">
      <div className="container my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="flex flex-col bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex p-4 gap-4">
                <img
                  src={card.image}
                  alt={`Card ${card.id}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-lg  mb-2 text-red-500">
                    {card.title}
                  </p>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
