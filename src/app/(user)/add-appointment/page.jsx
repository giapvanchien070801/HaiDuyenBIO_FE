"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Input, Form, Button, Select, DatePicker, message } from "antd";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import BannerBreadcrumb from "@/components/user/common-component/BannerBreadcrumb";
import CardFeedback from "@/components/user/CardFeedback";
import CardLatestBlog from "@/components/user/CardLatestBlog";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import moment from "moment";
import { handleSrcImg } from "@/common/functions/commonFunction";
import dayjs from "dayjs";
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
          MeetDate: dayjs(value?.MeetDate, "DD-MM-YYYY").format("DD-MM-YYYY"),
          Email: value?.Email,
          PhoneNumber: value?.PhoneNumber,
          FullName: value?.FullName,
          DoctorId: value?.DoctorId,
          Note: value?.Note,
        };
        createSchedule.mutate(valueSubmit);
      })
      .catch(() => {});
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

  const { data: listPost } = useQuery(["getListPostNewlist"], async () => {
    const res = await Base.getListPostPagination({
      Page: 1,
      Size: 6,
      KeySearch: "",
      CategoryId: -1,
    });

    return res?.Data;
  });

  const disabledDate = (current) => {
    // Nếu ngày được chọn (current) <= ngày hiện tại thì disable
    return current && current < moment().startOf("day");
  };

  return (
    <div className="flex flex-col items-center">
      <BannerBreadcrumb title="Tạo lịch hẹn" breadcrumb={breadcrumb} />

      {/* section form đăng KÝ */}
      <div className="sm:flex block   container-original  ">
        <div className="h-full sm:w-1/2 w-full sm:px-0 px-4  py-32">
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
                <div className="sm:flex block gap-4 w-full ">
                  <Form.Item
                    className="sm:w-1/2 w-full"
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
                  <Form.Item className="sm:w-1/2 w-full" name="Email">
                    <Input placeholder="Email của bạn" />
                  </Form.Item>
                </div>
                <div className="sm:flex block gap-4 w-full ">
                  <Form.Item
                    className="sm:w-1/2 w-full"
                    name="MeetDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày hẹn",
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                      onChange={onChangeDate}
                      disabledDate={disabledDate}
                      placeholder="Chọn ngày hẹn"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                  <Form.Item className="sm:w-1/2 w-full" name="MeetTime">
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
        <div className="h-full sm:w-1/2 sm:py-44 py-28">
          <div className="w-full h-full px-7">
            <img src="/images/doctor-.png" alt="alt" />
          </div>
        </div>
      </div>

      {/* section liên hệ */}
      <div className="bg-overlay w-full ">
        <div className="sm:flex block sm:px-0 px-10 justify-around items-center ">
          <p className="font-semibold text-5xl py-20 text-white sm:w-1/2 w-full text-center">
            Một nơi tuyệt vời của Trung tâm Bệnh viện Y tế & Chăm sóc Sức khỏe
          </p>
          <Button
            type="primary"
            onClick={() => {
              router.push("/contact");
            }}
            className="bg-[#2490eb] text-white h-12 py-3 px-5  font-semibold flex items-center sm:mb-0 mb-10"
          >
            LIÊN HỆ CHÚNG TÔI <PlusOutlined />
          </Button>
        </div>
      </div>

      {/* sction khách hàng nói gì */}
      <div className="bg-[#F4F6F9] w-full  mb-11 flex flex-col items-center">
        <div className="container-original  py-32">
          <div className=" p-0 lg:px-[15em] flex flex-col items-center mb-14 sm:p-0 px-4">
            <div className=" px-2 py-1 bg-[#d3e9fb] rounded">
              <p className="text-[#2490eb] font-semibold ">
                KHÁCH HÀNG CỦA CHÚNG TÔI
              </p>
            </div>
            <p className="text-5xl font-semibold mt-4 text-center">
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
              modules={[Autoplay]}
              effect="coverflow"
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="  sm:flex block gap-4">
                  <CardFeedback
                    avatar="/images/feedback1.jpg"
                    fullName="Ngô Quỳnh Anh"
                    feedBackType="Cancer Research"
                    content="Tôi đã khám chữa bệnh tại phòng khám từ những ngày đầu thành lập đến nay. Phòng khám rất rộng rãi, thoáng mát, bác sĩ tận tình tư vấn cũng như điều trị bệnh cho tôi. Tôi rất hài lòng về phòng khám."
                  />
                  <CardFeedback
                    avatar="/images/feedback2.jpg"
                    fullName="Hoàng Kiều Trang"
                    feedBackType="Cancer Research"
                    content="Chúng tôi đã đăng ký khám cho nhân viên công ty tại phòng khám, tôi nhận thấy hình thức và cách sắp xếp tổ chức gọn gàng, chuyên nghiệp, có kết quả nhanh, đội ngũ bác sĩ vui vẻ, thân thiện, nhiệt huyết."
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sm:flex block gap-4">
                  <CardFeedback
                    avatar="/images/feedback3.jpg"
                    fullName="Nguyễn Thị Quỳnh"
                    feedBackType="Cancer Research"
                    content="Bác sĩ tại phòng khám giải quyết thủ tục khám chữa bệnh rất nhanh, dặn dò bệnh nhân rất ân cần, chăm sóc bệnh nhân vui vẻ và chu đáo."
                  />
                  <CardFeedback
                    avatar="/images/feedback4.jpg"
                    fullName="Nguyễn Thị Thảo"
                    feedBackType="Cancer Research"
                    content="Tôi đã khám chữa bệnh tại phòng khám từ rất lâu. Phòng khám rất rộng rãi, thoáng mát, bác sĩ tại phòng khám giải quyết thủ tục khám chữa bệnh rất nhanh."
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
          <div className="p-0 lg:px-[15em] flex flex-col items-center mb-14 sm:p-0 px-4">
            <div className=" px-2 py-1 bg-[#d3e9fb] rounded">
              <p className="text-[#2490eb] font-semibold">
                BÀI VIẾT CỦA CHÚNG TÔI
              </p>
            </div>
            <p className="text-5xl font-semibold mt-4 text-center">
              Xem bài viết mới nhất
            </p>
          </div>
          <div className=" sm:flex block gap-4 flex-wrap sm:px-0 px-4 justify-center">
            {listPost?.map((post, index) => (
              <CardLatestBlog
                key={index}
                title={post?.Title}
                description={post?.Description}
                time={post?.CreatedAt}
                avatar={handleSrcImg(post?.ImagePath)}
                createBy={post?.AuthorName}
                comment="1"
                id={post?.Id}
                categoryId={post?.CategoryId}
              />
            ))}
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
