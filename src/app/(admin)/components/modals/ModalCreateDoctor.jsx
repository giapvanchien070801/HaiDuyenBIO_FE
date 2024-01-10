import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import Base from "@/app/models/Base";
import UploadAvatar from "../UploadAvatar";

const ModalCreateDoctor = (props) => {
  const { modalType, refetchData, idDoctor } = props;

  const isModalCreate = modalType === "create";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const { data: dataDetailDoctor } = useQuery(
    ["getDetailDoctor", idDoctor],
    async () => {
      const res = await Base.getDetailDoctor(idDoctor);

      return res;
    },
    { enabled: !!idDoctor }
  );

  useEffect(() => {
    if (dataDetailDoctor && idDoctor) {
      form.setFieldsValue({
        Name: dataDetailDoctor?.Name,
        Position: dataDetailDoctor?.Position,
      });
    }
  }, [dataDetailDoctor, idDoctor]);

  const createDoctorMutate = useMutation(Base.createDoctor, {
    onSuccess: () => {
      message.success("Tạo mới nhân sự thành công!");
      form.resetFields();
      if (refetchData) {
        refetchData();
      }
      setIsModalOpen(false);
    },
    onError: (e) => {
      message.error("Tạo mới nhân sự thất bại!");
    },
  });
  const updateDoctorMutate = useMutation(Base.updateDoctor, {
    onSuccess: () => {
      message.success("Sửa nhân sự thành công!");
      form.resetFields();
      if (refetchData) {
        refetchData();
      }
      setIsModalOpen(false);
    },
    onError: (e) => {
      message.error("Sửa nhân sự thất bại!");
    },
  });

  const handleOk = () => {
    form.submit();

    const listFieldName = ["Name", "Position"];
    form
      .validateFields(listFieldName)
      .then((value) => {
        const valueCreate = {
          Name: value?.Name?.trim(),
          Position: value?.Position?.trim(),
          ImagePath: "avatar.png",
        };

        const valueUpdate = {
          Id: idDoctor,
          Name: value?.Name?.trim(),
          Position: value?.Position?.trim(),
          ImagePath: "avatar.png",
        };

        if (isModalCreate) {
          createDoctorMutate.mutate(valueCreate);
        } else {
          updateDoctorMutate.mutate(valueUpdate);
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
        title={`${isModalCreate ? "Thêm" : "Sửa"} nhân sự bài viết`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isModalCreate ? "Tạo" : "Sửa"}
        cancelText="Hủy"
      >
        <Form
          className="w-full flex flex-col items-center"
          initialValues={{
            requiredSelect: undefined,
            optionalSelect: undefined,
            optionalInput: "",
          }}
          form={form}
          layout="vertical"
        >
          <UploadAvatar uploadType="avatar" />
          <Form.Item
            className="mt-3 w-full"
            label="Tên nhân sự"
            name="Name"
            rules={[
              { required: true, message: "Tên nhân sự không được bỏ trống!" },
            ]}
          >
            <Input placeholder="Nhập tên nhân sự" />
          </Form.Item>

          <Form.Item
            className=" w-full"
            label="Chức danh"
            name="Position"
            rules={[
              { required: true, message: "Chức danh không được bỏ trống!" },
            ]}
          >
            <Input placeholder="Nhập chức danh cho nhân sự" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateDoctor;
