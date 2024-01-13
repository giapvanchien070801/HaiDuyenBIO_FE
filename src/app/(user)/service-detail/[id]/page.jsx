"use client";

import { Collapse, Spin } from "antd";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import Link from "next/link";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";

export default function ServiceDetail({ params }) {
  // Sử dụng query param từ URL
  const idService = params?.id;

  // api lấy danh sách tất cả dịch vụ
  const { data: listService } = useQuery(
    ["getAllServiceMenu"],
    async () => {
      const res = await Base.getAllService();
      return res;
    },
    {}
  );
  const { data: dataService, isFetching } = useQuery(
    ["getDetailService", idService],
    async () => {
      const res = await Base.getDetailService(idService);

      return res;
    },
    { enabled: !!idService }
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
          <span className="text-[#2490eb]">{dataService?.Name}</span>
        </>
      ),
    },
  ];

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items = [
    {
      key: "1",
      label: "Tôi có thể đến đâu để cung cấp mẫu để thử nghiệm?",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "Điều gì xảy ra với mẫu của tôi sau khi tôi đã cung cấp nó?",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label:
        "Thử nghiệm trong phòng thí nghiệm sẽ khiến tôi tốn bao nhiêu tiền?",
      children: <p>{text}</p>,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="flex flex-col items-center">
      <BannerBreadcrumb title={dataService?.Name} breadcrumb={breadcrumb} />

      <div className=" flex   container-original  py-32">
        <div className="w-4/12">
          <div className="w-full bg-[#f4f6f9]  p-8 mb-12">
            {listService?.map((service, index) => (
              <div
                key={index}
                className={`${
                  service?.Id === Number(idService)
                    ? "bg-[#2490eb] text-white"
                    : "bg-white"
                } mb-2 rounded`}
              >
                <Link
                  href={`/service-detail/${service?.Id}`}
                  className=" flex py-4 px-6  justify-between text-base font-medium"
                >
                  {service?.Name}
                  <RightOutlined />
                </Link>
              </div>
            ))}
          </div>
          <div className="w-full">
            <Link href={`/contact`}>
              <img
                src="https://medicate.peacefulqode.com/wp-content/uploads/2022/03/call-img-1.jpg"
                alt=""
                className="w-full"
              />
            </Link>
          </div>
        </div>
        <div className="w-8/12 bg-red-40 h-full p-8">
          <Spin spinning={isFetching}>
            <div
              dangerouslySetInnerHTML={{ __html: dataService?.Description }}
              className="blog-content"
            />
          </Spin>

          {/* Lời khuyên & Thông tin về Sức khỏe */}
          <div className="mt-10">
            <p className="text-3xl font-semibold">
              Lời khuyên & Thông tin về Sức khỏe
            </p>
            <p className="text-[#666666]  mt-4 leading-8 mb-10">
              Medicate is a long established fact that a reader will be
              distracted by the readable content of a page when looking at its
              layout. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <CustomCollapse>
              <Collapse
                bordered={false}
                items={items}
                // defaultActiveKey={["1"]}
                onChange={onChange}
              />
            </CustomCollapse>
          </div>
        </div>
      </div>
    </div>
  );
}

const CustomCollapse = styled.div`
  & .ant-collapse {
    border-radius: 0px;
  }
  & .ant-collapse-item {
    margin-bottom: 30px;
    border-radius: 3px;
  }
  & .ant-collapse-header {
    padding: 15px 30px !important;
    background-color: #f4f6f9;
  }
  & .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
  }
  & .ant-collapse-header-text {
    font-size: 16px;
    font-weight: 600;
  }
  & .ant-collapse-content-box {
    padding: 15px 30px !important;
    color: #666666;
    line-height: 2rem;
  }
`;
