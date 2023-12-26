"use client";
import { Avatar, Badge, Popover, message } from "antd";
import { useState } from "react";
import {
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  InteractionOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import MenuSidebar from "../components/MenuSidebar";
import { useRouter } from "next/navigation";

export default function AdminHomeLayout({ children }) {
  const [isCloseMenu, setIsCloseMenu] = useState(false);
  const router = useRouter();

  const handleClickSidebar = () => {
    setIsCloseMenu(!isCloseMenu);
  };

  const handleLogOut = () => {
    router.push("/login-admin");
    message.success("Đăng xuất thành công");
  };

  const contentPopover = (
    <div className=" cursor-pointer">
      <div className="flex items-center pr-4 py-3 gap-2 border-y hover:bg-[#4361ee1a] p-2">
        <InteractionOutlined />
        <p>Đổi mật khẩu</p>
      </div>
      <div
        onClick={() => handleLogOut()}
        className="text-red-700 flex items-center pr-4 py-3 gap-2 border-b hover:bg-[#4361ee1a] p-2"
      >
        <LogoutOutlined />
        <p>Sign Out</p>
      </div>
    </div>
  );
  const titleHover = (
    <div className=" flex gap-2 cursor-pointer">
      <Avatar
        size={40}
        src="https://adminlte.io/themes/v3/dist/img/user8-128x128.jpg"
        shape="square"
      />
      <div>
        <p>Giáp Văn Chiến</p>
        <p> abctest@gmail.com</p>
      </div>
    </div>
  );
  return (
    <div className=" flex">
      {/* siderbar */}
      <div
        className={`  absolute  min-h-[100vh] main-sidebar flex flex-col items-center p-3 ${
          isCloseMenu ? "w-[70px]" : "w-64"
        }`}
      >
        <img className="w-36 mb-5" src="/images/logo-login.png" alt="logo" />

        <MenuSidebar className="w-full h-full" isCloseMenu={isCloseMenu} />
      </div>

      {/* main content */}
      <div
        className={` w-full min-h-[100vh] content-wraper bg-[#f3f3f5] ${
          isCloseMenu ? "ml-[70px]" : "ml-64"
        }`}
      >
        {/* header */}
        <div className="h-14 border-y border-solid border-[#dee2e6] p-2 flex justify-between items-center ">
          <div>
            {isCloseMenu ? (
              <MenuUnfoldOutlined
                className="ml-3 text-2xl text-gray-500 hover:text-gray-700"
                onClick={() => handleClickSidebar()}
              />
            ) : (
              <MenuFoldOutlined
                className="ml-3 text-2xl text-gray-500 hover:text-gray-700"
                onClick={() => handleClickSidebar()}
              />
            )}
          </div>

          <div className=" gap-4 flex items-center mr-4">
            <Badge count={5} size="default">
              <BellOutlined style={{ fontSize: "20px", color: "gray" }} />
            </Badge>
            <Popover
              content={contentPopover}
              title={titleHover}
              trigger="click"
            >
              <Avatar src="https://adminlte.io/themes/v3/dist/img/user8-128x128.jpg" />
            </Popover>
          </div>
        </div>
        {/* nội dung trang */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
