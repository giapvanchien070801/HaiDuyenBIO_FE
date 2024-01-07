"use client";

import { Collapse } from "antd";
import { HomeOutlined, RightOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import Link from "next/link";

export default function ServiceDetail({ params }) {
  // Sử dụng query param từ URL
  const idService = params?.id;

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
          <span className="text-[#2490eb]">Cộng hưởng từ</span>
        </>
      ),
    },
  ];

  const listService = [
    { content: "Cộng hưởng từ", id: 1 },
    { content: "Khám bệnh", id: 2 },
    { content: "Miễn dịch", id: 3 },
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
      <BannerBreadcrumb title="Cộng hưởng từ" breadcrumb={breadcrumb} />

      <div className=" flex   container-original  py-32">
        <div className="w-4/12">
          <div className="w-full bg-[#f4f6f9]  p-8 mb-12">
            {listService?.map((service, index) => (
              <div
                key={index}
                className={`${
                  service?.id === Number(idService)
                    ? "bg-[#2490eb] text-white"
                    : "bg-white"
                } mb-2 rounded`}
              >
                <Link
                  href={`/service-detail/${service?.id}`}
                  className=" flex py-4 px-6  justify-between text-base font-medium"
                >
                  {service?.content}
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
          <h4 className="mb-10">Nội dung của bài viết về các dịch vụ</h4>
          <img
            src="https://nld.mediacdn.vn/2020/3/23/89963885102126374520495725234434303294701568o-15849685424641174163940.jpg"
            alt=""
          />

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
