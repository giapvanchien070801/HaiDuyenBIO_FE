"use client";

import { HomeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import SidebarUser from "@/components/user/common-component/SidebarUser";
import { Breadcrumb, Pagination, Spin } from "antd";

import { useState } from "react";
import CardPNews from "@/components/user/common-component/CardPNews";

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: "Lợi ích của men vi sinh đối với sức khỏe đường ruột",
      image: "/images/post1.jpg",
      description:
        "Men vi sinh đóng vai trò quan trọng trong việc cân bằng hệ vi sinh đường ruột, hỗ trợ tiêu hóa và tăng cường hệ miễn dịch...",
      publishDate: "2024-01-15",
    },
    {
      id: 2,
      title: "5 loại thực phẩm giàu probiotic tự nhiên",
      image: "/images/post1.jpg",
      description:
        "Khám phá những thực phẩm lên men tự nhiên như kim chi, sữa chua, dưa cải... giúp bổ sung men vi sinh một cách tự nhiên cho cơ thể.",
      publishDate: "2024-01-12",
    },
    {
      id: 3,
      title: "Công nghệ sản xuất men vi sinh hiện đại",
      image: "/images/post1.jpg",
      description:
        "Tìm hiểu quy trình sản xuất men vi sinh với công nghệ tiên tiến, đảm bảo chất lượng và hiệu quả cao nhất cho người sử dụng.",
      publishDate: "2024-01-10",
    },
    {
      id: 4,
      title: "Men vi sinh cho trẻ em - Những điều cần biết",
      image: "/images/post1.jpg",
      description:
        "Hướng dẫn chi tiết về cách chọn và sử dụng men vi sinh an toàn, hiệu quả cho trẻ em ở các độ tuổi khác nhau.",
      publishDate: "2024-01-08",
    },
    {
      id: 5,
      title: "Xu hướng phát triển ngành công nghiệp vi sinh",
      image: "/images/post1.jpg",
      description:
        "Phân tích các xu hướng mới nhất trong nghiên cứu và phát triển các sản phẩm vi sinh, probiotic trong năm 2024.",
      publishDate: "2024-01-05",
    },
    {
      id: 6,
      title: "Ứng dụng men vi sinh trong nông nghiệp",
      image: "/images/post1.jpg",
      description:
        "Khám phá vai trò của các chế phẩm vi sinh trong canh tác nông nghiệp hữu cơ và phát triển bền vững.",
      publishDate: "2024-01-03",
    },
  ];

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Tin tức</span>
        </>
      ),
    },
  ];

  return (
    <div className="pb-24">
      {/* <UserSwiper /> */}

      <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-0 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />
          <Spin spinning={false}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {news.map((item) => (
                <CardPNews key={item.id} dataNews={item} />
              ))}
            </div>
            <div className="flex justify-center my-4">
              <Pagination
                className="p-0"
                total={news.length}
                pageSize={6}
                showSizeChanger={false}
              />
            </div>
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
  );
}
