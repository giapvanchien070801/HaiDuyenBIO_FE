"use client";

import { HomeOutlined } from "@ant-design/icons";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";
import CardDoctor from "@/components/user/CardDoctor";

export default function ListDoctor() {
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
          <span className="text-[#2490eb]">Danh sách nhân sự</span>
        </>
      ),
    },
  ];

  // api lấy danh sách tất cả bác sĩ
  const { data: listDoctor } = useQuery(
    ["getAllDoctorUser"],
    async () => {
      const res = await Base.getAllDoctor();

      return res;
    },
    {}
  );

  console.log("listDoctor", listDoctor);

  return (
    <div className="flex flex-col items-center mb-36 ">
      <BannerBreadcrumb title="Danh sách nhân sự" breadcrumb={breadcrumb} />
      <div className="container-original  pb-24 mt-32">
        <div className="flex flex-col items-center">
          <div className=" px-2 py-1 bg-[#d3e9fb] rounded">
            <p className="text-[#2490eb] font-semibold">
              Đội ngũ của chúng tôi
            </p>
          </div>
          <p className="text-5xl font-semibold mt-4 mb-11">
            Những chuyên gia hàng đầu
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          {listDoctor?.length &&
            listDoctor?.map((doctor, index) => (
              <CardDoctor
                title={index}
                name={doctor?.Name}
                imagePath={doctor?.ImagePath}
                position={doctor?.Position}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
