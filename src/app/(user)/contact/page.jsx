"use client";

import { Input, Form, Button, message, Breadcrumb } from "antd";
import { MailOutlined, PhoneFilled, PushpinFilled } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";
import CardContact from "@/components/user/CardContact";
import styled from "@emotion/styled";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import { useMutation } from "react-query";
import Base from "@/models/Base";
import UserSwiper from "@/components/user/UserSwiper";
const { TextArea } = Input;

export default function Contact() {
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
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Liên hệ</span>
        </>
      ),
    },
  ];

  const createDoctorMutate = useMutation(Base.createContact, {
    onSuccess: () => {
      message.success("Tạo liên hệ thành công!");
      form.resetFields();
    },
    onError: (e) => {
      message.error("Tạo liên hệ thất bại!");
    },
  });

  const handleSunmit = () => {
    form.submit();

    const listFieldName = [
      "Name",
      "Message",
      "Subject",
      "PhoneNumber",
      "Email",
    ];
    form
      .validateFields(listFieldName)
      .then((value) => {
        createDoctorMutate.mutate(value);
      })
      .catch(() => {});
    // setIsModalOpen(false);
  };

  return (
    <div>
      <UserSwiper />

      {/* <img
        src="https://haiduyenbio.com/wp-content/uploads/2024/07/sieu-men-duong-ruot-min.jpg"
        className="w-full"
      /> */}

      <div className="flex flex-col items-center">
        {/* <BannerBreadcrumb title="Liên hệ" breadcrumb={breadcrumb} /> */}
        <div className="container-original ">
          <Breadcrumb items={breadcrumb} className="mt-10 " />
        </div>
        <div className=" my-20 flex sm:flex-row  flex-col items-center justify-between container-original  gap-8">
          <CardContact
            title="Vị trí của chúng tôi"
            icon={<MailOutlined className=" text-white text-4xl" />}
            content="Thôn Nam Điện, Xã Nam Dương, Huyện Lục Ngạn, Tỉnh Bắc Giang"
          />
          <CardContact
            icon={<PhoneFilled className="text-white text-4xl" />}
            title="Số điện thoại liên hệ"
            content="0988 888 888"
          />
          <CardContact
            icon={<PushpinFilled className="text-white text-4xl" />}
            title="Email liên hệ"
            content="haiduyenbio@gmail.com"
          />
        </div>

        <div className=" w-4/5 md:w-7/12  bg-white -mb-10 z-10 rounded shadow-container-contact flex flex-col items-center px-[45px] py-14">
          <div className=" px-2 py-1 bg-[#d3e9fb] rounded">
            <p className="text-[#2490eb] font-semibold">Liên hệ</p>
          </div>
          <p className="text-5xl font-semibold mt-4 mb-11">
            Liên hệ với chúng tôi
          </p>
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
              <div className="sm:flex block gap-4 w-full mb-8">
                <Form.Item
                  className="sm:w-1/2 w-full"
                  name="Name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên của bạn!",
                    },
                  ]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item className="sm:w-1/2 w-full" name="Email">
                  <Input placeholder="Email của bạn" />
                </Form.Item>
              </div>
              <div className="sm:flex block gap-4 w-full mb-8">
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
                <Form.Item className="sm:w-1/2 w-full" name="Subject">
                  <Input placeholder="Triệu chứng của bạn" />
                </Form.Item>
              </div>
              <Form.Item
                className="w-full mb-8"
                name="Message"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lời nhắn!",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="Lời nhắn" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => handleSunmit()}
                  className="bg-[#2490eb] text-white py-3 px-5 h-auto font-semibold"
                >
                  ĐĂNG KÝ NGAY
                </Button>
              </Form.Item>
            </Form>
          </CustomForm>
        </div>
        <div className="w-full h-[670px] bg-slate-400">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59472.50910802227!2d106.578903!3d21.309759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a9e7eff3b02c7%3A0x4151a2dcebea0d91!2zTmFtIMSQaeG7h24sIEzhu6VjIE5n4bqhbiwgQuG6r2MgR2lhbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1749575243560!5m2!1svi!2sus"
            width="100%"
            height="100%"
            // style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

const CustomForm = styled.div`
  width: 100%;
  & input,
  textarea {
    background-color: #f4f6f9;
    border: none;
  }
  & input {
    font-size: 16px;
    font-weight: 400;
    padding: 0 15px;
    height: 54px;
    color: gray;
  }
  & textarea {
    font-size: 16px;
    height: 150px;
    color: gray;
  }
`;
