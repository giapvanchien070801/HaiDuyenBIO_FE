import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, message, DatePicker } from "antd";
import { PlusCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import UploadImage from "../upload/UploadImage";
import dayjs from "dayjs";

const ModalCreateDoctor = (props) => {
  const { modalType, refetchData, idDoctor } = props;

  const isModalCreate = modalType === "create";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueAvatar, setValueAvatar] = useState();
  const [resetValueAvatar, setResetValueAvatar] = useState(false);

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const dateFormat = "DD-MM-YYYY";
  const { data: dataDetailDoctor } = useQuery(
    ["getDetailDoctor", idDoctor, isModalOpen],
    async () => {
      const res = await Base.getDetailDoctor(idDoctor);

      return res;
    },
    { enabled: !!idDoctor }
  );

  useEffect(() => {
    if (dataDetailDoctor && idDoctor && isModalOpen) {
      form.setFieldsValue({
        Name: dataDetailDoctor?.Name,
        Position: dataDetailDoctor?.Position,
      });
      setValueAvatar(dataDetailDoctor?.ImagePath);
    }
  }, [dataDetailDoctor, idDoctor, isModalOpen]);

  const createDoctorMutate = useMutation(Base.createDoctor, {
    onSuccess: () => {
      setValueAvatar();
      setResetValueAvatar(true);
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
      setValueAvatar();
      setResetValueAvatar(true);
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

    const listFieldName = ["Name", "Position", "StartWorkDate", "EndWorkDate"];
    form
      .validateFields(listFieldName)
      .then((value) => {
        const StartWorkDate = dayjs(value?.StartWorkDate, dateFormat).format(
          dateFormat
        );
        const EndWorkDate = dayjs(value?.EndWorkDate, dateFormat).format(
          dateFormat
        );

        const valueCreate = {
          Name: value?.Name?.trim(),
          Position: value?.Position?.trim(),
          ImagePath: valueAvatar || "",
          StartWorkDate: StartWorkDate,
          EndWorkDate: EndWorkDate,
        };

        const valueUpdate = {
          Id: idDoctor,
          Name: value?.Name?.trim(),
          Position: value?.Position?.trim(),
          ImagePath: valueAvatar || dataDetailDoctor?.ImagePath,
          StartWorkDate:
            StartWorkDate !== "Invalid Date"
              ? StartWorkDate
              : dataDetailDoctor?.StartWorkDate,
          EndWorkDate:
            EndWorkDate !== "Invalid Date"
              ? EndWorkDate
              : dataDetailDoctor?.EndWorkDate,
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
          <UploadImage
            uploadType="avatar"
            onChange={(value) => {
              setValueAvatar(value);
            }}
            imgDetail={dataDetailDoctor && idDoctor && valueAvatar}
            resetValue={resetValueAvatar}
          />
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
          <div className="flex w-full gap-4">
            {(dataDetailDoctor?.StartWorkDate || !idDoctor) && (
              <Form.Item
                className=" w-1/2"
                label="Thời gian bắt đầu làm việc"
                name="StartWorkDate"
                rules={[
                  {
                    required: isModalCreate,
                    message: "Thời gian bắt đầu không được bỏ trống!",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  className="w-full"
                  placeholder="Từ ngày"
                  defaultValue={
                    dataDetailDoctor?.StartWorkDate
                      ? dayjs(dataDetailDoctor?.StartWorkDate, dateFormat)
                      : null
                  }
                />
              </Form.Item>
            )}

            <ArrowRightOutlined />
            {(dataDetailDoctor?.EndWorkDate || !idDoctor) && (
              <Form.Item
                className=" w-1/2"
                label="Thời gian nghỉ"
                name="EndWorkDate"
                rules={[
                  {
                    required: isModalCreate,
                    message: "Thời gian nghỉ không được bỏ trống!",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Đến ngày"
                  format={dateFormat}
                  defaultValue={
                    dataDetailDoctor?.EndWorkDate
                      ? dayjs(dataDetailDoctor?.EndWorkDate, dateFormat)
                      : null
                  }
                />
              </Form.Item>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCreateDoctor;
