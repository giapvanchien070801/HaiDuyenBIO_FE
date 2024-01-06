import { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Switch, message } from "antd";
import "react-quill/dist/quill.snow.css";
import TextEditor from "./TextEditor";
import UploadAvatar from "./UploadAvatar";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

const { TextArea } = Input;

const CreateOrEdit = (props) => {
  const { isCloseMenu } = props;

  const router = useRouter();

  const [isShowPost, setIsShowPost] = useState(true);
  const [valueTextEditor, setValueTextEditor] = useState("");

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const onChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChangeSwitch = (checked) => {
    setIsShowPost(checked);
    console.log(`switch to ${checked}`);
  };

  return (
    <CustomForm className="w-full h-full ">
      <Form
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <div className="flex gap-3">
          <UploadAvatar />
          <div className="w-full">
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Tiêu đề không được bỏ trống!",
                },
              ]}
              className="w-full mb-3 "
              label="Tiêu đề"
            >
              <Input allowClear className=" mb-5" placeholder="Nhập tiêu đề" />
            </Form.Item>
            <Form.Item
              name="description"
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

        <p className="mb-2">Nội dung trang:</p>

        <TextEditor
          onChange={(value) => {
            setValueTextEditor(value);
          }}
        />

        <div className="mt-5 flex justify-between gap-3">
          <Form.Item className="w-3/12" label="Ngày tạo">
            <DatePicker
              className="w-full"
              showTime
              onChange={onChange}
              onOk={onOk}
            />
          </Form.Item>

          <Form.Item className="w-3/12" label="Người tạo">
            <Input allowClear className="" placeholder="" />
          </Form.Item>

          <Form.Item className="w-3/12" label="Ngày cập nhật">
            <DatePicker
              className="w-full"
              showTime
              onChange={onChange}
              onOk={onOk}
            />
          </Form.Item>

          <Form.Item className="w-3/12" label="Người cập nhật">
            <Input allowClear className="" placeholder="" />
          </Form.Item>
        </div>
        <div className="mt-5 flex gap-3 ">
          <Form.Item className="w-3/12" label="Danh mục">
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              onChange={onChangeSelect}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>
          <Form.Item className="w-3/12" label="Thuộc nội dung menu">
            <Select
              showSearch
              placeholder="Chọn Menu"
              optionFilterProp="children"
              onChange={onChangeSelect}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            className="w-3/12"
            label={isShowPost ? "Hiển thị" : "Không hiển thị"}
          >
            <Switch className="" defaultChecked onChange={onChangeSwitch} />
          </Form.Item>
        </div>

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
                router.back();
                message.success("Tạo thành công!");
              }}
              type="primary"
              htmlType="submit"
              className="bg-[#2c3d94]"
            >
              Tạo/Sửa
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
