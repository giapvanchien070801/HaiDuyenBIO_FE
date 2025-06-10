import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";

const ModalCreateCategoryIngredient = (props) => {
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

  const createCateMutate = useMutation(Base.createCategory, {
    onSuccess: () => {
      message.success("Tạo mới danh mục nguyên liệu thành công!");
      form.resetFields();
      if (refetchData) {
        refetchData();
      }
      setIsModalOpen(false);
    },
    onError: (e) => {
      message.error("Tạo mới danh mục Sản phẩm thất bại!");
    },
  });
  const updateCateMutate = useMutation(Base.updateCategory, {
    onSuccess: () => {
      message.success("Sửa danh mục Sản phẩm thành công!");
      form.resetFields();
      if (refetchData) {
        refetchData();
      }
      setIsModalOpen(false);
    },
    onError: (e) => {
      message.error("Sửa danh mục Sản phẩm thất bại!");
    },
  });

  const handleOk = () => {
    form.submit();

    const listFieldName = ["Name"];
    form
      .validateFields(listFieldName)
      .then((value) => {
        const valueCreate = {
          Name: value?.Name?.trim(),
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
        title={`${isModalCreate ? "Thêm" : "Sửa"} danh mục nguyên liệu`}
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
            label="Tên danh mục nguyên liệu"
            name="Name"
            rules={[
              {
                required: true,
                message: "Tên danh mục nguyên liệu không được bỏ trống!",
              },
            ]}
          >
            <Input placeholder="Nhập tên danh mục nguyên liệu" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateCategoryIngredient;
