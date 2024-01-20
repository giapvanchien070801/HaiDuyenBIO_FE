"use client";

import { HomeOutlined } from "@ant-design/icons";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import SidebarUser from "@/components/user/SidebarUser";
import { Spin } from "antd";

export default function DepartmentDetail({ params }) {
  // Sử dụng query param từ URL
  const idDepartment = params?.id;

  const { data: dataDepartment, isFetching } = useQuery(
    ["getDetailDepartment", idDepartment],
    async () => {
      const res = await Base.getDetailDepartment(idDepartment);

      return res;
    },
    { enabled: !!idDepartment }
  );
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
          <span className="text-[#2490eb]">{dataDepartment?.Name}</span>
        </>
      ),
    },
  ];

  return (
    <div className="  pb-24">
      <BannerBreadcrumb title={dataDepartment?.Name} breadcrumb={breadcrumb} />

      <div className="grid xl:grid-cols-10 gap-6 mt-12 container-original mx-auto">
        <div className="blog-content col-span-7 bg-white md:px-0 px-4">
          <Spin spinning={isFetching}>
            <div
              dangerouslySetInnerHTML={{ __html: dataDepartment?.Description }}
            />
          </Spin>
        </div>

        {/* sidebar */}
        <SidebarUser />
      </div>
    </div>
  );
}
