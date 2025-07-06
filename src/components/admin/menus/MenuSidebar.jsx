import { useState } from "react"

import {
  HomeOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  PartitionOutlined,
  InsertRowAboveOutlined,
  UserSwitchOutlined,
  PictureOutlined,
  ContactsOutlined,
  ScheduleOutlined,
  FullscreenOutlined,
  OrderedListOutlined,
  VideoCameraAddOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons"
import CollapseMemuItem from "./CollapseMemuItem"

const MenuSidebar = props => {
  const { isCloseMenu } = props
  const [indexItemSelected, setIndexItemSelected] = useState(null)

  const lstDataMenu = [
    {
      text: "Trang quản trị",
      icon: <HomeOutlined />,
      pushTo: "/admin/home"
    },

    {
      text: "Quản lý Sản phẩm",
      icon: <InsertRowAboveOutlined />,
      listSubMenu: [
        {
          icon: <FullscreenOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh mục Sản phẩm",
          pushTo: "/admin/service/categories-service"
        },
        ,
        {
          icon: <OrderedListOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách Sản phẩm",
          pushTo: "/admin/service"
        }
      ]
    },

    {
      text: "Quản trị nội dung",
      icon: <FileSearchOutlined />,
      listSubMenu: [
        {
          icon: <UnorderedListOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh mục bài viết",
          pushTo: "/admin/list-post/categories-post"
        },
        {
          icon: <FileTextOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách bài viết",
          pushTo: "/admin/list-post"
        }
      ]
    },
    {
      text: "Quản lý menu",
      icon: <OrderedListOutlined />,

      listSubMenu: [
        {
          icon: <FullscreenOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Menu chính",
          pushTo: "/admin/list-post/categories-post?type=menu"
        },
        {
          icon: <OrderedListOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Menu phụ",
          pushTo: "/admin/list-post?type=menu"
        }
      ]
    },

    {
      text: "Quản lý Liên hệ",
      icon: <ContactsOutlined />,
      pushTo: "/admin/customer-contact"
    },
    {
      text: "Quản lý Video",
      icon: <VideoCameraAddOutlined />,
      pushTo: "/admin/videos"
    },
    {
      text: "Quản lý đơn hàng",
      icon: <ShoppingCartOutlined />,
      pushTo: "/admin/orders"
    },
    {
      text: "Quản lý Tài khoản",
      icon: <UserSwitchOutlined />,
      pushTo: "/admin/accounts-admin"
    }
  ]

  const handleClickItem = index => {
    if (indexItemSelected !== index) {
      setIndexItemSelected(index)
    } else {
      setIndexItemSelected(null)
    }
  }

  return (
    <div className="w-full h-full ">
      {lstDataMenu.map((itemMenu, index) => (
        <CollapseMemuItem
          key={index}
          listSubMenu={itemMenu?.listSubMenu}
          isCloseMenu={isCloseMenu}
          isActive={indexItemSelected === index ? true : false}
          onClick={() => handleClickItem(index)}
          text={itemMenu.text}
          icon={itemMenu.icon}
          pushTo={itemMenu?.pushTo}
        />
      ))}
    </div>
  )
}

export default MenuSidebar
