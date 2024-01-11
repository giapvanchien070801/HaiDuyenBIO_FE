"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Input, Form, Button, Select, DatePicker, message } from "antd";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import CardFeedback from "@/components/user/CardFeedback";
import CardLatestBlog from "@/components/user/CardLatestBlog";
import { useMutation, useQuery } from "react-query";
import Base from "@/app/models/Base";
import moment from "moment";
const { TextArea } = Input;

export default function AddAppointment() {
  const router = useRouter();
  const [form] = Form.useForm();
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
      href: "/add-appointment",
      title: (
        <>
          <span className="text-[#2490eb]">Tạo lịch hẹn</span>
        </>
      ),
    },
  ];

  const createSchedule = useMutation(Base.createSchedule, {
    onSuccess: () => {
      message.success("Tạo lịch hẹn thành công!");
      form.resetFields();
    },
    onError: (e) => {
      message.error("Tạo lịch hẹn thất bại!");
    },
  });

  const handleSunmit = () => {
    form.submit();

    const listFieldName = [
      "MeetTime",
      "MeetDate",
      "Email",
      "PhoneNumber",
      "FullName",
      "DoctorId",
      "Note",
    ];
    form
      .validateFields(listFieldName)
      .then((value) => {
        const valueSubmit = {
          MeetTime: value?.MeetTime,
          MeetDate: moment(value?.MeetDate).format("DD-MM-YYYY"),
          Email: value?.Email,
          PhoneNumber: value?.PhoneNumber,
          FullName: value?.FullName,
          DoctorId: value?.DoctorId,
          Note: value?.Note,
        };
        createSchedule.mutate(valueSubmit);
      })
      .catch(() => {});
    // setIsModalOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  // api lấy danh sách tất cả bác sĩ
  const { data: listDoctor } = useQuery(
    ["getAllgetAllDoctorSchedule"],
    async () => {
      const res = await Base.getAllDoctor();

      const dataConver = res?.map((doctor) => {
        return { label: doctor?.Name, value: doctor?.Id };
      });
      return dataConver;
    },
    {}
  );

  return (
    <div className="flex flex-col items-center">
      <BannerBreadcrumb title="Tạo lịch hẹn" breadcrumb={breadcrumb} />

      {/* section form đăng KÝ */}
      <div className=" flex   container-original  ">
        <div className="h-full w-1/2  py-32">
          <div className="bg-[#F4F6F9] w-full h-full p-11">
            <CustomForm>
              <Form
                className="w-full"
                initialValues={{
                  requiredSelect: undefined,
                  optionalSelect: undefined,
                  optionalInput: "",
                }}
                form={form}
                layout="vertical"
              >
                <Form.Item
                  className="w-full"
                  name="DoctorId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn bác sĩ cần gặp",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn bác sĩ"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={listDoctor}
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên của bạn",
                    },
                  ]}
                  name="FullName"
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <div className="flex gap-4 w-full ">
                  <Form.Item
                    className="w-1/2"
                    name="PhoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại của bạn",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại của bạn" />
                  </Form.Item>
                  <Form.Item className="w-1/2" name="Email">
                    <Input placeholder="Email của bạn" />
                  </Form.Item>
                </div>
                <div className="flex gap-4 w-full ">
                  <Form.Item
                    className="w-1/2"
                    name="MeetDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày hẹn",
                      },
                    ]}
                  >
                    <DatePicker className="w-full" onChange={onChangeDate} />
                  </Form.Item>
                  <Form.Item className="w-1/2" name="MeetTime">
                    <Input placeholder="Thời gian" />
                  </Form.Item>
                </div>
                <Form.Item className="w-full " name="Note">
                  <TextArea rows={3} placeholder="Ghi chú" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => handleSunmit()}
                    className="bg-[#2490eb] text-white py-3 px-5 h-auto font-semibold"
                  >
                    TẠO LỊCH
                  </Button>
                </Form.Item>
              </Form>
            </CustomForm>
          </div>
        </div>
        <div className="h-full w-1/2 py-44">
          <div className="w-full h-full px-7">
            <img
              src="https://medicate.peacefulqode.com/wp-content/uploads/2022/04/doctor-.png"
              alt="alt"
            />
          </div>
        </div>
      </div>

      {/* section liên hệ */}
      <div className="bg-overlay w-full ">
        <div className="flex justify-around items-center ">
          <p className="font-semibold text-5xl py-20 text-white w-1/2">
            Một nơi tuyệt vời của Trung tâm Bệnh viện Y tế & Chăm sóc Sức khỏe
          </p>
          <Button
            type="primary"
            onClick={() => {
              router.push("/contact");
            }}
            className="bg-[#2490eb] text-white h-12 py-3 px-5  font-semibold flex items-center"
          >
            LIÊN HỆ CHÚNG TÔI <PlusOutlined />
          </Button>
        </div>
      </div>

      {/* sction khách hàng nói gì */}
      <div className="bg-[#F4F6F9] w-full  mb-11 flex flex-col items-center">
        <div className="container-original  py-32">
          <div className="px-[15em] flex flex-col items-center mb-14">
            <div className=" px-2 py-1 bg-[#d3e9fb] rounded">
              <p className="text-[#2490eb] font-semibold">
                KHÁCH HÀNG CỦA CHÚNG TÔI
              </p>
            </div>
            <p className="text-5xl font-semibold mt-4">
              Khách hàng của chúng tôi hài lòng
            </p>
            <p className="text-[#666666] text-center mt-4 leading-8">
              Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm
              bởi cách bố trí của nó. Lorem Ipsum chỉ đơn giản là văn bản giả
              của ngành in ấn và sắp chữ.
            </p>
          </div>
          {/* feedback */}
          <div>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              modules={[Autoplay]}
              effect="coverflow"
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="flex gap-4">
                  <CardFeedback
                    avatar="https://faceinch.vn/upload/news/chup-anh-the-tha-toc-3007.jpg
        "
                    fullName="Ngô Quỳnh Anh"
                    feedBackType="Cancer Research"
                    content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even believable.There are many variations of passages of Lorem Ipsum available"
                  />
                  <CardFeedback
                    avatar="https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-anh-the-dep-chat-luong.jpg
        "
                    fullName="Hoàng Kiều Trang"
                    feedBackType="Cancer Research"
                    content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even believable.There are many variations of passages of Lorem Ipsum available"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex gap-4">
                  <CardFeedback
                    avatar="https://pgdmyloc.edu.vn/wp-content/uploads/2023/09/anh-the-dep.jpeg
        "
                    fullName="Nguyễn Thị Quỳnh"
                    feedBackType="Cancer Research"
                    content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even believable.There are many variations of passages of Lorem Ipsum available"
                  />
                  <CardFeedback
                    avatar="https://inanhdepphanthiet.com/Uploads/images/ThietKeNha/2022/3/%E1%BA%A2nh%20th%E1%BA%BB%20%C4%91%E1%BA%B9p%20(2)_1115.jpg
        "
                    fullName="Nguyễn Thị Quỳnh Anh"
                    feedBackType="Cancer Research"
                    content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even believable.There are many variations of passages of Lorem Ipsum available"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      {/* section bài viết mới nhất */}
      <div className=" w-full  mb-11 flex flex-col items-center">
        <div className="container-original  py-32">
          <div className="px-[15em] flex flex-col items-center mb-14">
            <div className=" px-2 py-1 bg-[#d3e9fb] rounded">
              <p className="text-[#2490eb] font-semibold">
                BÀI VIẾT CỦA CHÚNG TÔI
              </p>
            </div>
            <p className="text-5xl font-semibold mt-4">Xem bài viết mới nhất</p>
          </div>
          <div className="flex gap-4">
            <CardLatestBlog
              title="Chiến lược truyền máu và phẫu thuật tim"
              description="Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm bởi
          cách bố trí của nó. Lorem Ipsum chỉ đơn giản là văn bản giả của ngành
          in ấn và sắp chữ."
              time="07/01/2024"
              avatar="https://i.ytimg.com/vi/-U__FfOm9yA/maxresdefault.jpg"
              createBy="ADMIN"
              comment="1"
            />
            <CardLatestBlog
              title="Các thực phẩm chức năng tốt cho hệ tiêu hóa"
              description="Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm bởi
          cách bố trí của nó. Lorem Ipsum chỉ đơn giản là văn bản giả của ngành
          in ấn và sắp chữ."
              time="08/01/2024"
              avatar="https://nld.mediacdn.vn/2020/3/23/89963885102126374520495725234434303294701568o-15849685424641174163940.jpg"
              createBy="ADMIN"
              comment="8"
            />
            <CardLatestBlog
              title="Các thực phẩm chức năng tốt cho hệ tiêu hóa"
              description="Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm bởi
          cách bố trí của nó. Lorem Ipsum chỉ đơn giản là văn bản giả của ngành
          in ấn và sắp chữ."
              time="02/01/2024"
              avatar="https://image.congan.com.vn/thumbnail/CATP-5111-2020-3-23/chong-dich-covid-19-12.jpg"
              createBy="ADMIN"
              comment="10"
            />
          </div>
          {/* feedback */}
        </div>
      </div>
    </div>
  );
}

const CustomForm = styled.div`
  width: 100%;
  & input,
  textarea,
  .ant-select-selector {
    // background-color: #f4f6f9;
    border: none !important;
  }
  & input {
    font-size: 16px;
    font-weight: 400;
    padding: 0 15px;
    height: 54px !important;
    color: gray;
  }
  & .ant-select-single {
    height: 54px !important;
    color: gray;
  }
  & textarea {
    font-size: 16px;
    color: gray;
  }
  & .ant-form-item .ant-form-item-label {
    font-weight: 500;
  }
  & .ant-picker {
    padding: 0px 11px 0px;
    border: none;
  }
`;
