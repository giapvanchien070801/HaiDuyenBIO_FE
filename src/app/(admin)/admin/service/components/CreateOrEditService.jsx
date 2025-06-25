import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Spin } from "antd";
import "react-quill/dist/quill.snow.css";

import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";

import TextEditor from "@/components/admin/common/TextEditor";
import UploadImage from "@/components/admin/upload/UploadImage";
import UploadListImageService from "./UploadListImageService";
import Product from "@/models/Product";
import CategoryProduct from "@/models/CategoryProduct";
import {
  omitField,
  removeEmptyFields,
} from "@/common/functions/commonFunction";

const { TextArea } = Input;

const CreateOrEditService = (props) => {
  const { id, actionType } = props;
  const [form] = Form.useForm();

  // typePage = post | department | service
  // actionType = create | update
  const isCreate = actionType === "create";

  const router = useRouter();

  // tạo sửa Sản phẩm
  const createServiceMutate = useMutation(Product.createProduct, {
    onSuccess: () => {
      message.success("Tạo mới Sản phẩm thành công!");
      router.back();
    },
    onError: (e) => {
      message.error("Tạo mới Sản phẩm thất bại!");
    },
  });

  const updateServiceMutate = useMutation(
    (values) => Product.updateProduct(id, omitField(values, "id")),
    {
      onSuccess: () => {
        message.success("Sửa Sản phẩm thành công!");
        form.resetFields();
        router.back();
      },
      onError: (e) => {
        message.error("Sửa Sản phẩm thất bại!");
      },
    }
  );

  const handleCreate = (values) => {
    if (isCreate) {
      createServiceMutate.mutate(values);
    } else {
      const valueUpdate = {
        id: id,
        ...values,
      };
      updateServiceMutate.mutate(valueUpdate);
    }
  };

  const { data: dataDetail } = useQuery(
    ["getDetail", id],
    async () => {
      const res = await Product.getProductDetail(id);
      form.setFieldsValue(res);
      return res;
    },
    { enabled: !!id }
  );

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
      const res = await CategoryProduct.getCategoryProductList(
        removeEmptyFields({
          Page: 1,
          Size: 1000,
          search: "",
        })
      );

      return res?.content?.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    },
    {}
  );

  const valueDescription = form.getFieldValue("description");

  return (
    <CustomForm className="w-full h-full ">
      <Spin
        spinning={
          createServiceMutate.isLoading || updateServiceMutate.isLoading
        }>
        <Form
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          scrollToFirstError
          form={form}
          onFinish={handleCreate}>
          <Form.Item name="imageUrl" label="Ảnh">
            <UploadListImageService
              onChange={(value) => {
                console.log("value", value);
              }}
              imgDetail={""}
            />
          </Form.Item>

          <div className="flex gap-3">
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tiêu đề không được bỏ trống!",
                },
              ]}
              className="w-1/2 mb-3 "
              label="Tên sản phẩm">
              <Input
                maxLength={500}
                allowClear
                className=" mb-5"
                placeholder="Nhập tên sản phẩm"
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Danh mục không được bỏ trống!",
                },
              ]}
              name="categoryId"
              className="w-1/2"
              label="Danh mục">
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

          <div className="flex gap-3 justify-between">
            <Form.Item
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống!",
                },
              ]}
              className="w-1/2"
              label={"Số lượng"}>
              <Input allowClear placeholder={"Nhập số lượng"} />
            </Form.Item>

            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống!",
                },
              ]}
              className="w-1/2"
              label={"Giá"}>
              <Input allowClear placeholder={"Nhập giá"} />
            </Form.Item>
          </div>

          <div className="flex gap-3">
            <Form.Item
              name="slug"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống!",
                },
              ]}
              className="w-1/2"
              label={"Slug"}>
              <Input allowClear placeholder={"Nhập slug"} />
            </Form.Item>

            <Form.Item
              name="discountPercent"
              rules={[
                {
                  required: true,
                  message: "Giảm giá không được bỏ trống!",
                },
              ]}
              className="w-1/2"
              label={"Giảm giá (%)"}>
              <Input allowClear placeholder={"Nhập giảm giá"} />
            </Form.Item>
          </div>

          <Form.Item
            name="summary"
            rules={[
              {
                required: true,
                message: "Mô tả không được bỏ trống!",
              },
            ]}
            className="w-full"
            label="Mô tả ngắn">
            <TextArea rows={4} placeholder="Nhập mô tả ngắn" maxLength={500} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả chi tiết"
            rules={[{ required: true, message: "Mô tả không được bỏ trống!" }]}>
            <TextEditor
              onChange={(value) => {
                form.setFieldsValue({
                  description: value,
                });
              }}
              valueDetail={valueDescription}
            />
          </Form.Item>

          <div className="gap-3 mt-5 float-right flex">
            <Button
              size="large"
              type="default"
              danger
              onClick={() => {
                router.back();
              }}>
              Hủy
            </Button>
            <Form.Item>
              <Button
                size="large"
                // onClick={() => {
                //   form.submit();
                // }}
                type="primary"
                htmlType="submit"
                className="bg-[#2c3d94]">
                {id ? "Sửa" : "Tạo"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </CustomForm>
  );
};

const CustomForm = styled.div`
  & .ant-form-item-control-input-content .mb-5 {
    margin: 0;
  }
`;

export default CreateOrEditService;
