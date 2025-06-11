"use client";

import { HomeOutlined } from "@ant-design/icons";
import BannerBreadcrumb from "@/components/user/common-component/BannerBreadcrumb";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import CardDoctor from "@/components/user/CardDoctor";
import { Breadcrumb, Spin } from "antd";
import ListVideos from "@/components/user/common-component/ListVideos";

export default function ListVideosPage() {
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
          <span className="text-[#2490eb]">Danh sách Videos</span>
        </>
      ),
    },
  ];

  // api lấy danh sách tất cả bác sĩ
  const { data: listDoctor, isFetching } = useQuery(
    ["getAllDoctorUser"],
    async () => {
      const res = await Base.getAllDoctor();

      return res;
    },
    {}
  );

  return (
    <div className="flex flex-col items-center mb-36 ">
      <div className="   pb-0  sm:mt-10 mt-16">
        <Breadcrumb items={breadcrumb} className="my-5" />
        <Spin spinning={false}>
          <div className="flex gap-4 flex-wrap md:px-0 px-4 justify-center">
            <ListVideos />
          </div>
        </Spin>
      </div>
    </div>
  );
}
