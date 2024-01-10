import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const ModalCreateAccount = (props) => {
  const { modalType } = props;

  const isModalCreate = modalType === "create";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();

    const listFieldName = ["fullName", "userName", "passWord"];
    form
      .validateFields(listFieldName)
      .then((value) => {
        console.log("value", value);
      })
      .catch(() => {});
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    // loginMutate.mutate(values)
    console.log("Received values:", values);
    router.push("admin/home");
  };

  return (
    <>
      {isModalCreate ? (
        <Button
          icon={<PlusCircleOutlined />}
          size="middle"
          type="primary"
          className="float-right  bg-blue-700 text-white"
          onClick={showModal}
        >
          Thêm mới
        </Button>
      ) : (
        <Button
          size="middle"
          className="border-teal-500 text-teal-500"
          type="default"
          onClick={showModal}
        >
          Xem chi tiết/Sửa
        </Button>
      )}

      <Modal
        title="Thêm tài khoản quản trị"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isModalCreate ? "Tạo" : "Sửa"}
        cancelText="Hủy"
      >
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
            label="Họ và tên"
            name="fullName"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tài khoản"
            name="userName"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="passWord"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateAccount;
