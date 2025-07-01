import { useEffect, useState } from "react"
import { Form, Input, Button, DatePicker, Select, Switch, message, Spin, InputNumber } from "antd"
import TextEditor from "@/components/admin/common/TextEditor"
import UploadAvatar from "../upload/UploadAvatar"
import { useRouter } from "next/navigation"
import styled from "@emotion/styled"
import { useMutation, useQuery } from "react-query"
import Base from "@/models/Base"
import UploadImage from "../upload/UploadImage"
import Product from "@/models/Product"
import CategoryProduct from "@/models/CategoryProduct"
import { omitField, removeEmptyFields } from "@/common/functions/commonFunction"

const { TextArea } = Input

const CreateOrEdit = props => {
  const { id, actionType } = props
  const [form] = Form.useForm()

  // actionType = create | update
  const isCreate = actionType === "create"

  const router = useRouter()

  // tạo sửa Khoa
  const createProductMutate = useMutation(Product.createProduct, {
    onSuccess: () => {
      message.success("Tạo mới sản phẩm thành công!")
      form.resetFields()
      router.back()
    },
    onError: e => {
      message.error("Tạo mới sản phẩm thất bại!")
    }
  })

  const updateProductMutate = useMutation(Product.updateProduct, {
    onSuccess: () => {
      message.success("Sửa sản phẩm thành công!")
      form.resetFields()
      router.back()
    },
    onError: e => {
      message.error("Sửa sản phẩm thất bại!")
    }
  })

  const { data: dataDetail, isFetching: isFetchingDetail } = useQuery(
    ["getDetail", id],
    async () => {
      const res = await Product.getProductDetail(id)

      return res
    },
    { enabled: !!id }
  )

  useEffect(() => {
    if (dataDetail && id) {
      form.setFieldsValue({
        Name: dataDetail?.Name,
        CategoryId: dataDetail?.CategoryId,
        Description: dataDetail?.Description,
        Title: dataDetail?.Title,
        Price: dataDetail?.Price,
        Content: dataDetail?.Content,
        ImagePath: dataDetail?.ImagePath
      })
    }
  }, [dataDetail, id])

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdmin"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList()

      const dataConver = res?.map(category => {
        return { label: category?.Name, value: category?.Id }
      })
      return dataConver
    },
    {}
  )

  const onFinish = values => {
    const valueCreate = {
      Name: values?.Name?.trim(),
      Description: ""
    }

    const valueUpdate = {
      Id: id,
      Name: values?.Name?.trim(),
      Description: ""
    }

    if (isCreate) {
      createProductMutate.mutate(valueCreate)
    } else {
      updateProductMutate.mutate(valueUpdate)
    }
  }

  return (
    <CustomForm className="w-full h-full ">
      <Spin spinning={createProductMutate.isLoading || updateProductMutate.isLoading || isFetchingDetail}>
        <Form
          layout="vertical"
          initialValues={{
            remember: true
          }}
          scrollToFirstError
          onFinish={onFinish}
          form={form}>
          <div className="flex justify-center">
            {/* <UploadAvatar /> */}
            <Form.Item name="ImagePath">
              <UploadImage
                onChange={value => {
                  form.setFieldsValue({
                    ImagePath: value
                  })
                }}
                imgDetail={form.getFieldValue("ImagePath")}
              />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="name"
              className="w-1/2"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống!"
                }
              ]}
              label={"Tên sản phẩm"}>
              <Input allowClear className=" mb-5" placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Danh mục không được bỏ trống!"
                }
              ]}
              name="categoryId"
              className="w-1/2"
              label="Danh mục">
              <Select
                showSearch
                placeholder="Chọn danh mục"
                optionFilterProp="children"
                filterOption={filterOption}
                options={listCategory}
              />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="price"
              className="w-1/2"
              rules={[
                {
                  required: true,
                  message: "Giá không được bỏ trống!"
                }
              ]}
              label={"Giá"}>
              <Input allowClear className=" mb-5" placeholder="Nhập giá" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Giảm giá không được bỏ trống!"
                }
              ]}
              name="discount"
              className="w-1/2"
              label="Giảm giá">
              <InputNumber
                allowClear
                placeholder="Nhập giảm giá"
                min={0}
                max={100}
                formatter={value => `${value}%`}
                // parser={(value) => value.replace("%", "")}
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="Description"
            rules={[
              {
                required: true,
                message: "Mô tả không được bỏ trống!"
              }
            ]}
            className="w-full"
            label="Mô tả ngắn">
            <TextArea rows={4} placeholder="Nhập mô tả" maxLength={500} />
          </Form.Item>

          <Form.Item name="content" label="Mô tả chi tiết">
            <TextEditor
              onChange={value => {
                form.setFieldsValue({
                  Content: value
                })
              }}
              valueDetail={form.getFieldValue("content")}
            />
          </Form.Item>

          <div className="gap-3 mt-5 float-right flex">
            <Button
              type="text"
              className="text-[#2c3d94]  border border-solid border-[#2c3d94]"
              onClick={() => {
                router.back()
              }}>
              Hủy
            </Button>
            <Form.Item>
              <Button
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
  )
}

const CustomForm = styled.div`
  & .ant-form-item-control-input-content .mb-5 {
    margin: 0;
  }
`

export default CreateOrEdit
