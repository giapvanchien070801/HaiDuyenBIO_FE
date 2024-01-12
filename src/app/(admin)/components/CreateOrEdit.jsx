import { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Switch, message } from "antd";
import "react-quill/dist/quill.snow.css";
import TextEditor from "./TextEditor";
import UploadAvatar from "./UploadAvatar";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { useMutation, useQuery } from "react-query";
import Base from "@/app/models/Base";
import UploadImage from "./UploadImage";

const { TextArea } = Input;

const CreateOrEdit = (props) => {
  const { typePage, id, actionType } = props;
  const [form] = Form.useForm();

  // typePage = post | department | service
  // actionType = create | update
  const isCreate = actionType === "create";

  const isPost = typePage === "post";

  const router = useRouter();

  const [valueTextEditor, setValueTextEditor] = useState("");
  const [valueAvatar, setValueAvatar] = useState();

  // tạo sửa Khoa
  const createDepartmentMutate = useMutation(Base.createDepartment, {
    onSuccess: () => {
      message.success("Tạo mới Khoa thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Tạo mới khoa thất bại!");
    },
  });
  const updateDepartmentMutate = useMutation(Base.updateDepartment, {
    onSuccess: () => {
      message.success("Sửa Khoa thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Sửa Khoa thất bại!");
    },
  });

  // tạo sửa dịch vụ
  const createServiceMutate = useMutation(Base.createService, {
    onSuccess: () => {
      message.success("Tạo mới Dịch vụ thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Tạo mới Dịch vụ thất bại!");
    },
  });
  const updateServiceMutate = useMutation(Base.updateService, {
    onSuccess: () => {
      message.success("Sửa Dịch vụ thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Sửa Dịch vụ thất bại!");
    },
  });

  // tạo sửa bài viết
  const createPostMutate = useMutation(Base.createPost, {
    onSuccess: () => {
      message.success("Tạo mới bài viết thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Tạo mới bài viết thất bại!");
    },
  });
  const updatePostMutate = useMutation(Base.updatePost, {
    onSuccess: () => {
      message.success("Sửa bài viết thành công!");
      form.resetFields();
      router.back();
    },
    onError: (e) => {
      message.error("Sửa bài viết thất bại!");
    },
  });

  const handleCreate = () => {
    form.submit();

    const listFieldName = ["Name"];
    const listFieldNamePost = ["Title", "Description", "CategoryId"];
    const listFields = isPost ? listFieldNamePost : listFieldName;
    form
      .validateFields(listFields)
      .then((value) => {
        const valueCreatePost = {
          ...value,
          Content: valueTextEditor,
          ImagePath: valueAvatar,
        };
        const valueUpdatePost = {
          ...value,
          Content: valueTextEditor || dataDetail?.Content,
          ImagePath: valueAvatar || dataDetail?.ImagePath,
          Id: id,
        };

        const valueCreate = {
          Name: value?.Name?.trim(),
          Description: valueTextEditor,
        };

        const valueUpdate = {
          Id: id,
          Name: value?.Name?.trim(),
          Description: valueTextEditor,
        };

        if (typePage === "department") {
          if (isCreate) {
            createDepartmentMutate.mutate(valueCreate);
          } else {
            updateDepartmentMutate.mutate(valueUpdate);
          }
        }
        if (typePage === "service") {
          if (isCreate) {
            createServiceMutate.mutate(valueCreate);
          } else {
            updateServiceMutate.mutate(valueUpdate);
          }
        }
        if (typePage === "post") {
          if (isCreate) {
            createPostMutate.mutate(valueCreatePost);
          } else {
            updatePostMutate.mutate(valueUpdatePost);
          }
        }
      })
      .catch(() => {});
  };

  const { data: dataDetail } = useQuery(
    ["getDetail", id],
    async () => {
      let res;
      if (typePage === "department") {
        res = await Base.getDetailDepartment(id);
      }
      if (typePage === "service") {
        res = await Base.getDetailService(id);
      }
      if (typePage === "post") {
        res = await Base.getDetailPost(id);
      }

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
      setValueTextEditor(dataDetail?.Content);
      setValueAvatar(dataDetail?.ImagePath);
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
      >
        {isPost && (
          <div className="flex gap-3">
            {/* <UploadAvatar /> */}
            <UploadImage
              onChange={(value) => {
                setValueAvatar(value);
              }}
              imgDetail={valueAvatar}
            />
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
                name="Description"
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
        )}
        {(typePage === "department" || typePage === "service") && (
          <Form.Item
            name="Name"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
            className="w-1/2 mb-3 "
            label={typePage === "department" ? "Tên khoa" : "Tên dịch vụ"}
          >
            <Input
              allowClear
              className=" mb-5"
              placeholder={
                typePage === "department" ? "Nhập tên khoa" : "Nhập tên Dịch vụ"
              }
            />
          </Form.Item>
        )}

        <p className="mb-2">{isPost ? "Nội dung trang:" : "Mô tả:"}</p>

        <TextEditor
          onChange={(value) => {
            setValueTextEditor(value);
          }}
          valueDetail={valueTextEditor}
        />

        {isPost && (
          <Form.Item
            rules={[
              {
                required: true,
                message: "Danh mục không được bỏ trống!",
              },
            ]}
            name="CategoryId"
            className="w-4/12 mt-5"
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
        )}

        <div className="gap-3 mt-5 float-right flex">
          <Button
            type="text"
            className="text-[#2c3d94]  border border-solid border-[#2c3d94]"
            onClick={() => {
              router.back();
            }}
          >
            Hủy
          </Button>
          <Form.Item>
            <Button
              onClick={() => {
                handleCreate();
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

export default CreateOrEdit;
