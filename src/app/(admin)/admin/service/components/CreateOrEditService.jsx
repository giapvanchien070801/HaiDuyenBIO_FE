import { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Switch, message } from "antd";
import "react-quill/dist/quill.snow.css";

import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";

import TextEditor from "@/components/admin/common/TextEditor";
import UploadImage from "@/components/admin/upload/UploadImage";
import UploadListImageService from "./UploadListImageService";

const { TextArea } = Input;

const CreateOrEditService = (props) => {
  const { id, actionType } = props;
  const [form] = Form.useForm();

  // typePage = post | department | service
  // actionType = create | update
  const isCreate = actionType === "create";

  const router = useRouter();

  const [valueAvatar, setValueAvatar] = useState();

  // tạo sửa Sản phẩm
  const createServiceMutate = useMutation(Base.createService, {
    onSuccess: () => {
      message.success("Tạo mới Sản phẩm thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Tạo mới Sản phẩm thất bại!");
    },
  });

  const updateServiceMutate = useMutation(Base.updateService, {
    onSuccess: () => {
      message.success("Sửa Sản phẩm thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Sửa Sản phẩm thất bại!");
    },
  });

  const handleCreate = (values) => {
    console.log("values", values);
    if (isCreate) {
      const valueCreate = {
        ...values,
        Description: valueTextEditor,
      };
      createServiceMutate.mutate(valueCreate);
    } else {
      const valueUpdate = {
        Id: id,
        ...values,
        Description: valueTextEditor,
      };
      updateServiceMutate.mutate(valueUpdate);
    }
  };

  const { data: dataDetail } = useQuery(
    ["getDetail", id],
    async () => {
      const res = await Base.getDetailService(id);

      return res;
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (dataDetail && id) {
      form.setFieldsValue({
        Name: dataDetail?.Name,
        CategoryId: dataDetail?.CategoryId,
        Description: dataDetail?.Description,
        Title: dataDetail?.Title,
      });
    }
  }, [dataDetail, id]);

  const onChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdmin"],
    async () => {
      const res = await Base.getAllCategory();

      const dataConver = res?.map((category) => {
        return { label: category?.Name, value: category?.Id };
      });
      return dataConver;
    },
    {}
  );

  return (
    <CustomForm className="w-full h-full ">
      <Form
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        scrollToFirstError
        form={form}
        onFinish={handleCreate}
      >
        <div className="flex gap-3">
          {/* <UploadAvatar /> */}
          <Form.Item name="ImagePath" label="">
            <UploadListImageService
            // onChange={(value) => {
            //   setValueAvatar(value);
            // }}
            // imgDetail={valueAvatar}
            />
          </Form.Item>
          <div className="w-full">
            <Form.Item
              name="Title"
              rules={[
                {
                  required: true,
                  message: "Tiêu đề không được bỏ trống!",
                },
              ]}
              className="w-full mb-3 "
              label="Tiêu đề"
            >
              <Input
                maxLength={500}
                allowClear
                className=" mb-5"
                placeholder="Nhập tiêu đề"
              />
            </Form.Item>
            <Form.Item
              name="subDescription"
              rules={[
                {
                  required: true,
                  message: "Mô tả không được bỏ trống!",
                },
              ]}
              className="w-full"
              label="Mô tả ngắn"
            >
              <TextArea rows={4} placeholder="Nhập mô tả" maxLength={500} />
            </Form.Item>
          </div>
        </div>

        <div className="flex gap-3 justify-between">
          <Form.Item
            name="Name"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
            className="w-1/2"
            label={"Tên Sản phẩm"}
          >
            <Input allowClear placeholder={"Nhập tên Sản phẩm"} />
          </Form.Item>

          <Form.Item
            rules={[
              {
                // required: true,
                message: "Danh mục không được bỏ trống!",
              },
            ]}
            name="CategoryId"
            className="w-1/2"
            label="Danh mục"
          >
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              onChange={onChangeSelect}
              onSearch={onSearch}
              filterOption={filterOption}
              options={listCategory}
            />
          </Form.Item>
        </div>

        <Form.Item name="Description" label="Mô tả">
          <TextEditor
            onChange={(value) => {
              form.setFieldsValue({
                Description: value,
              });
            }}
            valueDetail={form.getFieldValue("Description")}
          />
        </Form.Item>

        <div className="gap-3 mt-5 float-right flex">
          <Button
            size="large"
            type="default"
            danger
            onClick={() => {
              router.back();
            }}
          >
            Hủy
          </Button>
          <Form.Item>
            <Button
              size="large"
              onClick={() => {
                form.submit();
              }}
              type="primary"
              htmlType="submit"
              className="bg-[#2c3d94]"
            >
              {id ? "Sửa" : "Tạo"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </CustomForm>
  );
};

const CustomForm = styled.div`
  & .ant-form-item-control-input-content .mb-5 {
    margin: 0;
  }
`;

export default CreateOrEditService;
