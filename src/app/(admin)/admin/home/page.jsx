"use client";

import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import Base from "../../../../models/Base";

export default function Dashboard() {
  const breadcrumb = [
    {
      href: "/admin/home",
      title: (
        <p className="text-cyan-700">
          <HomeOutlined />
          <span className="ml-1">Trang chủ</span>
        </p>
      ),
    },
  ];

  const { data: dataAdmin } = useQuery(["getInforAdmin"], async () => {
    const res = await Base.getInforAdmin();
    sessionStorage.setItem("adminInfor", JSON.stringify(res));
    return res;
  });

  return (
    <div>
      <Breadcrumb className="mb-5" items={breadcrumb} />
      <div className="text-center">
        <p className="my-10 text-2xl">
          Xin chào quản trị viên! {dataAdmin?.Name}
        </p>
      </div>

      <div className="mx-auto">
        <img
          src="/images/logo-haiduyenbio-1.png"
          alt="logo"
          className="m-auto"
        />
      </div>
    </div>
  );
}
