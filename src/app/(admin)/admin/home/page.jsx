"use client";

import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import { dataChart } from "../../common/data-fake/dataChartFake";
import { useQuery } from "react-query";
import Base from "../../../models/Base";

export default function Dashboard() {
  const data = dataChart;

  const config = {
    data,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,

    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
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
      <p className="my-10 text-2xl">Bảng thống kê</p>

      <Line {...config} />

      {/* <LineChart {...config} /> */}

      {/* <PieChart {...configPieChart} /> */}
    </div>
  );
}
