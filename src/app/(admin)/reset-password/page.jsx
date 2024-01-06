"use client";

import Base from "@/app/models/Base";
import styled from "@emotion/styled";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

function ResetPasswordPage() {
  const router = useRouter();

  // delete Record
  const loginMutate = useMutation(Base.getListNewService, {
    onSuccess: () => {
      message.success("Đăng nhập thành công!");
      // set token
    },
    onError: () => {
      message.error("Đăng nhập thất bại!");
    },
  });

  const onFinish = (values) => {
    // loginMutate.mutate(values)
    console.log("Received values:", values);
    router.push("admin/home");
  };
  const notAcc = `Don't have an account?`;

  return (
    <div className="bg-[#eeeeee] w-full h-[100vh] flex items-center">
      <div className="mx-auto  bg-white p-16 rounded-2xl flex flex-col items-center min-w-[30rem]">
        <h2 className="mb-3 ">Đổi mật khẩu</h2>
        <Form
          className="w-full"
          name="change_password"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tài khoản"
            name="userName"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          {/* <Form.Item
          label="Old Password"
          name="old_password"
          rules={[
            { required: true, message: "Please input your old password!" },
          ]}
        >
          <Input.Password />
        </Form.Item> */}

          <Form.Item
            label="Mật khẩu mới"
            name="new_password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirm_new_password"
            dependencies={["new_password"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex gap-2">
            <Button
              type="text"
              onClick={() => router.push("admin/home")}
              className="w-1/2 border-teal-500 text-teal-500"
            >
              Hủy
            </Button>
            <Form.Item className="w-1/2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-teal-500"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
