"use client"
import { Avatar, Badge, Button, Popover, message } from "antd"
import { useState } from "react"
import {
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  InteractionOutlined,
  MenuFoldOutlined,
  UserOutlined
} from "@ant-design/icons"
import MenuSidebar from "../../../components/admin/menus/MenuSidebar"
import { useRouter } from "next/navigation"
import { Cookies } from "react-cookie"

export default function AdminHomeLayout({ children }) {
  const [isCloseMenu, setIsCloseMenu] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const cookies = new Cookies()

  const handleClickSidebar = () => {
    setIsCloseMenu(!isCloseMenu)
  }

  const handleLogOut = () => {
    setIsLoading(true)

    // Thử nhiều cách khác nhau để xóa cookie
    try {
      cookies.remove("accessToken", { path: "/" })
      cookies.remove("accessToken")

      setTimeout(() => {
        setIsLoading(false)
        router.push("/login-admin")
        message.success("Đăng xuất thành công")
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      message.error("Có lỗi xảy ra khi đăng xuất")
    }
  }

  const contentPopover = (
    <Button loading={isLoading} icon={<LogoutOutlined />} onClick={() => handleLogOut()} className="w-full my-2">
      Log out
    </Button>
  )
  const titleHover = (
    <div className=" flex gap-2 cursor-pointer items-center">
      <div className="w-10 h-10 rounded-md bg-slate-300 flex items-center justify-center">
        <UserOutlined className="text-2xl text-slate-800" />
      </div>
      <div>
        <b>Quản trị viên</b>
        <p>leduychu@gmail.com</p>
      </div>
    </div>
  )

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`absolute min-h-[100vh] main-sidebar flex flex-col items-center p-3 ${
          isCloseMenu ? "w-[70px]" : "w-64"
        }`}>
        <img className="w-36 mb-4 mt-1" src="/images/logo-haiduyenbio-1.png" alt="logo" />
        <MenuSidebar className="w-full h-full" isCloseMenu={isCloseMenu} />
      </div>

      {/* Main content */}
      <div className={`w-full min-h-[100vh] content-wraper bg-[#f3f3f5] ${isCloseMenu ? "ml-[70px]" : "ml-64"}`}>
        {/* Header */}
        <div className="h-14 border-y border-solid border-[#dee2e6] p-2 flex justify-between items-center">
          <div>
            {isCloseMenu ? (
              <MenuUnfoldOutlined
                className="ml-3 text-2xl text-gray-500 hover:text-gray-700"
                onClick={handleClickSidebar}
              />
            ) : (
              <MenuFoldOutlined
                className="ml-3 text-2xl text-gray-500 hover:text-gray-700"
                onClick={handleClickSidebar}
              />
            )}
          </div>

          <div className="gap-4 flex items-center mr-4">
            <Popover content={contentPopover} title={titleHover} trigger="click">
              <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center">
                <UserOutlined className="text-xl text-slate-800" />
              </div>
            </Popover>
          </div>
        </div>

        {/* Nội dung */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
