import React, { useEffect, useState } from "react"
import { Button, Modal, Input, Form, message, Spin } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useMutation, useQuery } from "react-query"
import CategoryProduct from "@/models/CategoryProduct"
import { omitField } from "@/common/functions/commonFunction"

const ModalCreateCategoryService = props => {
  const { refetchData, idCategory = null, isModalOpen, setIsModalOpen, onActions, isMenu } = props

  const isModalCreate = idCategory === null
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const { data: dataDetailCate, isFetching: isFetchingDetailCate } = useQuery(
    ["getDetailCate", idCategory],
    async () => {
      const res = await CategoryProduct.getDetailCategoryProduct(idCategory)

      return res
    },
    { enabled: !!idCategory }
  )

  useEffect(() => {
    if (dataDetailCate && !!idCategory) {
      form.setFieldsValue(dataDetailCate)
    }
  }, [dataDetailCate, idCategory])

  const createCateMutate = useMutation(CategoryProduct.createCategoryProduct, {
    onSuccess: () => {
      message.success("Tạo mới danh mục Sản phẩm thành công!")

      if (refetchData) {
        refetchData()
      }
      setIsModalOpen(false)
    },
    onError: e => {
      message.error("Tạo mới danh mục Sản phẩm thất bại!")
    }
  })

  const updateCateMutate = useMutation(data => CategoryProduct.updateCategoryProduct(data.id, omitField(data, "id")), {
    onSuccess: () => {
      message.success("Sửa danh mục Sản phẩm thành công!")
      if (refetchData) {
        refetchData()
      }
      setIsModalOpen(false)
      onActions(null, "reset")
    },
    onError: e => {
      message.error("Sửa danh mục Sản phẩm thất bại!")
    }
  })

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    onActions(null, "reset")
    setIsModalOpen(false)
  }

  const handleFinish = values => {
    const valueUpdate = {
      id: idCategory,
      type: isMenu ? "MENU" : "ARTICLE",
      ...values
    }

    if (isModalCreate) {
      createCateMutate.mutate(omitField(valueUpdate, "id"))
    } else {
      updateCateMutate.mutate(valueUpdate)
    }
  }

  return (
    <>
      <Modal
        title={`${isModalCreate ? "Thêm" : "Sửa"}  ${isMenu ? "Menu chính" : "danh mục bài viết"}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={isModalCreate ? "Tạo" : "Sửa"}
        okButtonProps={{
          loading: createCateMutate.isLoading || updateCateMutate.isLoading
        }}
        cancelText="Hủy">
        <Spin spinning={createCateMutate.isLoading || updateCateMutate.isLoading || isFetchingDetailCate}>
          <Form className="w-full" form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
              label={`Tên ${isMenu ? "Menu chính" : "danh mục bài viết"}`}
              name="name"
              rules={[
                {
                  required: true,
                  message: `Tên ${isMenu ? "Menu chính" : "danh mục bài viết"} không được bỏ trống!`
                }
              ]}>
              <Input placeholder={`Nhập tên ${isMenu ? "Menu chính" : "danh mục bài viết"}`} />
            </Form.Item>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[
                {
                  required: true,
                  message: `Slug ${isMenu ? "Bài viết" : "Dịch vụ"} không được bỏ trống!`
                }
              ]}>
              <Input placeholder={`Nhập slug ${isMenu ? "Bài viết" : "Dịch vụ"}`} />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: `Mô tả ${isMenu ? "Bài viết" : "Dịch vụ"} không được bỏ trống!`
                }
              ]}>
              <Input.TextArea placeholder={`Nhập mô tả ${isMenu ? "Bài viết" : "Dịch vụ"}`} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}
export default ModalCreateCategoryService
