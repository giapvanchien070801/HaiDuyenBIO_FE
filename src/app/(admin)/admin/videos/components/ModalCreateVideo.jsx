import React, { useEffect, useState } from "react"
import { Button, Modal, Input, Form, message } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from "react-query"
import Base from "@/models/Base"
import FilesRepository from "@/models/FilesRepository"
import CardVideo from "@/components/user/common-component/CardVideo"

const ModalCreateVideo = props => {
  const { isModalOpen = false, setIsModalOpen, onActions, dataDetail } = props

  const isModalCreate = !dataDetail

  const [form] = Form.useForm()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!!dataDetail) {
      form.setFieldValue("link", dataDetail?.externalLink)
      form.setFieldValue("description", dataDetail?.description)
    }
  }, [dataDetail])

  const createVideoMutate = useMutation(FilesRepository.uploadFile, {
    onSuccess: () => {
      message.success("Tạo mới video thành công!")
      queryClient.invalidateQueries({ queryKey: ["getListVideoAdmin"] })
      setIsModalOpen(false)
    },
    onError: e => {
      message.error("Tạo mới video thất bại!")
    }
  })

  const updateVideoMutate = useMutation(data => FilesRepository.updateFile(dataDetail?.id, data), {
    onSuccess: () => {
      message.success("Sửa video thành công!")
      onActions(null, "reset")
      queryClient.invalidateQueries({ queryKey: ["getListVideoAdmin"] })
      setIsModalOpen(false)
    },
    onError: e => {
      message.error("Sửa video thất bại!")
    }
  })

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    onActions(null, "reset")
  }

  const handleFinish = values => {
    if (isModalCreate) {
      createVideoMutate.mutate({ ...values, type: 2 })
    } else {
      updateVideoMutate.mutate({
        id: dataDetail?.id,
        externalLink: values?.link,
        description: values?.description,
        type: 2
      })
    }
  }

  return (
    <>
      <Modal
        title={`${dataDetail ? "Sửa" : "Thêm"} video`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={dataDetail ? "Sửa" : "Tạo"}
        cancelText="Hủy">
        <Form
          className="w-full"
          initialValues={{
            requiredSelect: undefined,
            optionalSelect: undefined,
            optionalInput: ""
          }}
          form={form}
          onFinish={handleFinish}
          layout="vertical">
          <Form.Item
            label="Link video"
            name="link"
            rules={[{ required: true, message: "Link video không được bỏ trống!" }]}>
            <Input placeholder="Nhập link video" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả không được bỏ trống!" }]}>
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
        {!isModalCreate && (
          <CardVideo
            video={{
              id: 1,
              title: dataDetail?.description,
              url: dataDetail?.externalLink,
              channel: "Hải Duyên Bio",
              views: "12K",
              timestamp: dataDetail?.createdAt,
              avatar: "/images/LOGO.JPG"
            }}
          />
        )}
      </Modal>
    </>
  )
}
export default ModalCreateVideo
