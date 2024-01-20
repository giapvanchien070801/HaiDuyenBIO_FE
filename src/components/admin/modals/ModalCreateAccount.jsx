import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";

const ModalCreateAccount = (props) => {
  const { modalType, refetchData, idCategory } = props;

  const isModalCreate = modalType === "create";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { data: dataDetailCate } = useQuery(
    ["getDetailCate", idCategory],
    async () => {
      const res = await Base.getDetailCate(idCategory);

      return res;
    },
    { enabled: !!idCategory }
  );

  useEffect(() => {
    if (dataDetailCate && idCategory) {
      form.setFieldValue("Name", dataDetailCate?.Name);
    }
  }, [dataDetailCate, idCategory]);

  const createCateMutate = useMutation(Base.createAccount, {
    onSuccess: () => {
      message.success("Tạo mới tài khoản thành công!");
      form.resetFields();
      if (refetchData) {
        refetchData();
      }
      setIsModalOpen(false);
    },
    onError: (e) => {
      if (e?.response?.data?.Message === "Duplicate Account") {
        // trường hợp danh mục bài viết đã có bài viết
        message.error("Tên tài khoản bị trùng!");
      } else {
        message.error("Tạo mới tài khoản thất bại!");
      }
    },
  });
  const updateCateMutate = useMutation(Base.updateCategory, {
    onSuccess: () => {
      message.success("Sửa tài khoản thành công!");
      form.resetFields();
      if (refetchData) {
        refetchData();
      }
      setIsModalOpen(false);
    },
    onError: (e) => {
      message.error("Sửa tài khoản thất bại!");
    },
  });

  const handleOk = () => {
    form.submit();

    const listFieldName = ["Name", "Account", "HashPassword"];
    form
      .validateFields(listFieldName)
      .then((value) => {
        const valueCreate = {
          Name: value?.Name?.trim(),
          HashPassword: value?.HashPassword?.trim(),
          Account: value?.Account?.trim(),
        };
        const valueUpdate = {
          Id: idCategory,
          Name: value?.Name?.trim(),
        };

        if (isModalCreate) {
          createCateMutate.mutate(valueCreate);
        } else {
          updateCateMutate.mutate(valueUpdate);
        }
      })
      .catch(() => {});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
        title={`${isModalCreate ? "Thêm" : "Sửa"} tài khoản quản trị viên`}
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
            label="Tên quản trị viên"
            name="Name"
            rules={[
              {
                required: true,
                message: "Tên quản trị viên không được bỏ trống!",
              },
            ]}
          >
            <Input placeholder="Nhập tên quản trị viên" />
          </Form.Item>
          <Form.Item
            label="Tên tài khoản"
            name="Account"
            rules={[
              { required: true, message: "Tài khoản không được bỏ trống!" },
            ]}
          >
            <Input placeholder="Nhập tài khoản" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="HashPassword"
            rules={[
              { required: true, message: "Mật khẩu không được bỏ trống!" },
            ]}
          >
            <Input.Password placeholder="Nhập Mật khẩu" className="mb-4" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateAccount;
