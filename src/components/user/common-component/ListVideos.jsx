"use client";

import { Button, Pagination } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import TitleList from "./TitleList";
import CardProduct from "./CardProduct";
import CardVideo from "./CardVideo";

export default function ListVideos() {
  const listVideo = [
    {
      id: 1,
      title: "Nhân sinh khối men EM 1 Lit thành 100 Lit như thế nào?",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "12K",
      timestamp: "2 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 2,
      title:
        "Men vi sinh chế phẩm sinh học chăn nuôi thủy sản thủy phân đạm cá nuôi tôm công nghệ cao – LACBIOTIC BB10",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "8.5K",
      timestamp: "3 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 3,
      title:
        "Men vi sinh chế phẩm sinh học chăn nuôi thủy sản thủy phân đạm cá nuôi tôm công nghệ cao – LACBIOTIC BB10",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "15K",
      timestamp: "4 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 4,
      title:
        "Men Ủ Đa năng Em Gốc B9S10 cho chăn nuôi, thuỷ sản, thuỷ phân đạm cá, phân bón nông nghiệp",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "20K",
      timestamp: "5 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 5,
      title:
        "Men vi sinh chế phẩm sinh học chăn nuôi thủy sản thủy phân đạm cá nuôi tôm công nghệ cao – LACBIOTIC BB10",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "10K",
      timestamp: "6 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 6,
      title: "Hướng dẫn sử dụng men vi sinh trong nuôi trồng thủy sản",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "25K",
      timestamp: "7 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 7,
      title: "Quy trình sản xuất men vi sinh công nghệ cao tại Hải Duyên Bio",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "18K",
      timestamp: "8 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 8,
      title: "Giới thiệu dòng sản phẩm men vi sinh mới nhất của Hải Duyên Bio",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "30K",
      timestamp: "9 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
    {
      id: 9,
      title: "Ứng dụng men vi sinh trong xử lý môi trường ao nuôi thủy sản",
      url: "https://youtu.be/_d7dfwC4IuM",
      channel: "Hải Duyên Bio",
      views: "22K",
      timestamp: "10 tháng trước",
      avatar: "/images/LOGO.JPG",
    },
  ];
  return (
    <div className="container mx-auto pb-14 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <TitleList title="Video chính gốc" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {listVideo.map((video) => (
          <CardVideo key={video.id} video={video} />
        ))}
      </div>
      <Pagination
        className="flex justify-center my-10"
        total={listVideo.length}
        pageSize={4}
        showSizeChanger={false}
      />
    </div>
  );
}
