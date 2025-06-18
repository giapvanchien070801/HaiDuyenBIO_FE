"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function CardPNews(props) {
  const { dataNews } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/news/${dataNews.id || 6}`);
  };

  // Lấy category, fallback nếu không có
  const category =
    (dataNews.category && dataNews.category.toUpperCase()) || "CHUYÊN MỤC";

  return (
    <div
      key={dataNews.id}
      className=" py-4 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* CATEGORY */}
   
        <span className="px-4 text-xs font-bold text-[#787b9d] tracking-widest uppercase">
          {category}
        </span>
   

      {/* TITLE */}

        <h2 className="px-4 text-2xl font-bold m-0 hover:text-cyan-600 transition-colors duration-300 text-[#545454]">
          {dataNews.title}
        </h2>
        <div className="bg-black/10 block my-2 h-[3px] mx-2.5 max-w-[30px] w-full"></div>

      {/* TIME */}
      <div className="px-4 mt-2 mb-3 flex items-center text-gray-500 text-xs">
        <ClockCircleOutlined className="mr-1" />
        <span>
         ĐĂNG VÀO {dataNews.publishDate
            ? new Date(dataNews.publishDate).toLocaleDateString("vi-VN")
            : ""} BỞI BIO
        </span>
      </div>

      {/* IMAGE + DESCRIPTION */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-1/2 h-72">
        <img
          src={dataNews.image}
          alt={dataNews.title}
          className="object-cover mb-2 md:mb-0 size-full"
        />
        </div>
       
        <div className=" w-1/2 pr-5">
        <p className="text-gray-700 text-sm flex-1 text-justify self-center line-clamp-6">
          {dataNews.description}
        </p>
        <Button className="flex items-cente border-2 border-[#2a317a] text-[#2a317a] hover:text-cyan-700 font-medium text-sm transition-colors duration-300 mt-4">
          Tiếp tục đọc
          <ArrowRightOutlined className="ml-1" />
        </Button>
        </div>
      </div>

      {/* Đăng trong + category */}
      <div className="px-4 pb-4 pt-3 mt-auto">
        <span className="text-xs text-[#787b9d]">
          Đăng trong <span className="font-semibold text-[#2a317a]">{category}</span>
        </span>
      </div>
    </div>
  );
}
