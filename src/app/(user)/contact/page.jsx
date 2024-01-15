"use client";

import { Breadcrumb, Tag, Input, Form, Button, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { HomeOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import CardContact from "@/components/user/CardContact";
import {
  faEnvelope,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import { useMutation } from "react-query";
import Base from "@/app/models/Base";
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
    <div className="flex flex-col items-center">
      <BannerBreadcrumb title="Liên hệ" breadcrumb={breadcrumb} />

      <div className=" my-20 flex sm:flex-row  flex-col items-center justify-between container-original gap-8">
        <CardContact
          title="Vị trí của chúng tôi"
          icon={
            <FontAwesomeIcon
              icon={faLocationPin}
              className=" text-white text-4xl"
            />
          }
          content="Số 022 đường Chiềng On, phường Bình Minh, thành phố Lào Cai, tỉnh Lào
          Cai"
        />
        <CardContact
          icon={
            <FontAwesomeIcon icon={faPhone} className="text-white text-4xl" />
          }
          title="Số điện thoại liên hệ"
          content="0214 2202 888"
        />
        <CardContact
          icon={
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-white text-4xl"
            />
          }
          title="Email liên hệ"
          content="pkhnlc@gmail.com"
        />
      </div>

      <div className=" w-4/5  bg-white -mb-10 z-10 rounded shadow-container-contact flex flex-col items-center px-[45px] py-14">
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
            <Form.Item className="w-full mb-8" name="Message">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.8295839061443!2d104.02089117602485!3d22.435439137982076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd17dd6815ef0f%3A0x50b77df9b72d02e3!2zUGjDsm5nIEtow6FtIEjDoCBOw7RpIC0gTMOgbyBDYWk!5e0!3m2!1svi!2s!4v1704597279065!5m2!1svi!2s"
          width="100%"
          height="100%"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
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
