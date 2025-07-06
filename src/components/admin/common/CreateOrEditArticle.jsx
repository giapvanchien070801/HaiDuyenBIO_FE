import { Form, Input, Button, Select, message, Spin } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import styled from "@emotion/styled"
import { useMutation, useQuery } from "react-query"
import TextEditor from "@/components/admin/common/TextEditor"
import CategoryProduct from "@/models/CategoryProduct"
import { omitField, removeEmptyFields } from "@/common/functions/commonFunction"

import ArticleModal from "@/models/ArticleModal"
import UploadListImageArticle from "@/app/(admin)/admin/list-post/components/UploadListImageArticle"

const { TextArea } = Input

const CreateOrEditArticle = props => {
  const { id, actionType } = props
  const [form] = Form.useForm()
  const params = useSearchParams()
  const type = params.get("type")

  const isMenu = type === "menu"

  // typePage = post | department | service
  // actionType = create | update
  const isCreate = actionType === "create"

  const router = useRouter()

  // tạo sửa Sản phẩm
  const createServiceMutate = useMutation(ArticleModal.createArticle, {
    onSuccess: () => {
      message.success("Tạo mới bài viết thành công!")
      router.back()
    },
    onError: e => {
      message.error("Tạo mới bài viết thất bại!")
    }
  })

  const updateServiceMutate = useMutation(values => ArticleModal.updateArticle(id, omitField(values, "id")), {
    onSuccess: () => {
      message.success("Sửa bài viết thành công!")
      form.resetFields()
      router.back()
    },
    onError: e => {
      message.error("Sửa bài viết thất bại!")
    }
  })

  const handleCreate = values => {
    if (isCreate) {
      createServiceMutate.mutate(values)
    } else {
      const valueUpdate = {
        id: id,
        ...values
      }

      updateServiceMutate.mutate(valueUpdate)
    }
  }

  const { data: dataDetail } = useQuery(
    ["getDetail", id],
    async () => {
      const res = await ArticleModal.getArticleDetail(id)
      form.setFieldsValue(res)
      return res
    },
    { enabled: !!id }
  )

  const onChangeSelect = value => {
    // Handle selection change
  }
  const onSearch = value => {
    // Handle search
  }

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateAdmin"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList(
        removeEmptyFields({
          Page: 1,
          Size: 1000,
          search: "",
          type: isMenu ? "MENU" : "ARTICLE"
        })
      )

      return res?.content?.map(item => ({
        label: item.name,
        value: item.id
      }))
    },
    {}
  )

  const valueDescription = form.getFieldValue("content")
  const imageUrl = form.getFieldValue("imageUrl")

  return (
    <CustomForm className="w-full h-full ">
      <Spin spinning={createServiceMutate.isLoading || updateServiceMutate.isLoading}>
        <Form
          layout="vertical"
          initialValues={{
            remember: true
          }}
          scrollToFirstError
          form={form}
          onFinish={handleCreate}>
          <Form.Item name="imageUrl" label="Ảnh" rules={[{ required: true, message: "Ảnh không được bỏ trống!" }]}>
            <UploadListImageArticle
              onChange={imageResponse => {
                form.setFieldsValue({
                  imageUrl: imageResponse
                })
              }}
              // imageDetail={[dataDetail?.imageUrl]}
            />
          </Form.Item>

          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Tiêu đề không được bỏ trống!"
              }
            ]}
            className="w-full mb-3 "
            label={isMenu ? "Tên menu" : "Tên bài viết"}>
            <Input
              maxLength={500}
              allowClear
              className=" mb-5"
              placeholder={`Nhập tên ${isMenu ? "menu" : "bài viết"}`}
            />
          </Form.Item>

          <div className="flex gap-3">
            <Form.Item
              name="slug"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống!"
                }
              ]}
              className="w-1/2"
              label={"Slug"}>
              <Input allowClear placeholder={"Nhập slug"} />
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
              label={isMenu ? "Menu chính" : "Danh mục bài viết"}>
              <Select
                showSearch
                placeholder={`Chọn ${isMenu ? "menu chính" : "danh mục bài viết"}`}
                optionFilterProp="children"
                onChange={onChangeSelect}
                onSearch={onSearch}
                filterOption={filterOption}
                options={listCategory}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="summary"
            rules={[
              {
                required: true,
                message: "Mô tả không được bỏ trống!"
              }
            ]}
            className="w-full"
            label="Mô tả ngắn">
            <TextArea rows={4} placeholder="Nhập mô tả ngắn" maxLength={500} />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true, message: "Nội dung không được bỏ trống!" }]}>
            <TextEditor
              onChange={value => {
                form.setFieldsValue({
                  content: value
                })
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
                router.back()
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
  )
}

const CustomForm = styled.div`
  & .ant-form-item-control-input-content .mb-5 {
    margin: 0;
  }
`

export default CreateOrEditArticle
