"use client";

import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function CardPNews(props) {
  const { dataNews } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/news/${dataNews.id || 6}`);
  };

  return (
    <div
      key={dataNews.id}
      className="bg-white  rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={dataNews.image}
        alt={dataNews.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 hover:text-cyan-600 transition-colors duration-300">
          {dataNews.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{dataNews.description}</p>
        <div className="flex items-center text-gray-500 text-sm">
          <ClockCircleOutlined className="mr-1" />
          <span>
            {new Date(dataNews.publishDate).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>
    </div>
  );
}
