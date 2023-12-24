"use client";

import styled from "@emotion/styled";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Received values:", values);
    router.push("admin/home");
    message.success("Đăng nhập thành công!");
    // Xử lý đăng nhập ở đây
  };
  const notAcc = `Don't have an account?`;

  return (
    <div className="bg-login h-[100vh] flex items-center justify-center">
      <div className="bg-orange-600 w-3/4 h-3/4 rounded-2xl flex overflow-hidden">
        <div className="w-1/2 bg-white flex items-center flex-col justify-center">
          <p className=" mb-7 text-4xl font-mono">Login Admin</p>

          <CustomForm className="w-1/2">
            <Form
              name="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="w-full"
            >
              {/* <p className="mb-1">Tài khoản:</p> */}
              <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input placeholder="Tên đăng nhập" className="mb-4" />
              </Form.Item>

              {/* <p className="mb-1">Mật khẩu:</p> */}
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Mật khẩu" className="mb-4" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-[#2ba191] text-white mt-10"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </CustomForm>
          <div className="flex mt-2 font-sans">
            <p>{notAcc}</p>
            <p className="ml-2 text-[#fb9f66] font-semibold hover:text-orange-600 cursor-pointer ">
              REGISTER
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-[#2ba191] flex items-center flex-col justify-center">
          <p className="text-white mb-3 text-4xl font-mono">Wellcom Back</p>
          <img src="/images/logo-login-cut.png" alt="logo" />
        </div>
      </div>
    </div>
  );
}

const CustomForm = styled.div`
  & .ant-row {
    display: block !important;
  }
  & .ant-form-item .ant-form-item-label {
    text-align: start !important;
  }
  & .ant-form-item {
    margin-bottom: 0px;
  }
  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #2ba191;
    border-color: #407d74;
  }
`;

export default LoginPage;
