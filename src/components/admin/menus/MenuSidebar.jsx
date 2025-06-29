import { useState } from "react";

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
  ShoppingCartOutlined,
} from "@ant-design/icons";
import CollapseMemuItem from "./CollapseMemuItem";

const MenuSidebar = (props) => {
  const { isCloseMenu } = props;
  const [indexItemSelected, setIndexItemSelected] = useState(null);

  const lstDataMenu = [
    {
      text: "Trang quản trị",
      icon: <HomeOutlined />,
      pushTo: "/admin/home",
    },

    // {
    //   text: "Quản lý Đội ngũ",
    //   icon: <UsergroupAddOutlined />,
    //   listSubMenu: [
    //     {
    //       icon: <MenuOutlined className={`${isCloseMenu && "text-xs"}`} />,
    //       text: "Danh sách nhân sự",
    //       pushTo: "/admin/list-employee",
    //     },
    //   ],
    // },
    // {
    //   text: "Quản lý Khoa",
    //   icon: <PartitionOutlined />,
    //   listSubMenu: [
    //     {
    //       icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
    //       text: "Danh sách Khoa",
    //       pushTo: "/admin/departments",
    //     },
    //   ],
    // },
    {
      text: "Quản lý Sản phẩm",
      icon: <InsertRowAboveOutlined />,
      listSubMenu: [
        {
          icon: (
            <FullscreenOutlined className={`${isCloseMenu && "text-xs"}`} />
          ),
          text: "Danh mục Sản phẩm",
          pushTo: "/admin/service/categories-service",
        },
        ,
        {
          icon: (
            <OrderedListOutlined className={`${isCloseMenu && "text-xs"}`} />
          ),
          text: "Danh sách Sản phẩm",
          pushTo: "/admin/service",
        },
      ],
    },

    {
      text: "Quản trị nội dung",
      icon: <FileSearchOutlined />,
      listSubMenu: [
        {
          icon: (
            <UnorderedListOutlined className={`${isCloseMenu && "text-xs"}`} />
          ),
          text: "Danh mục bài viết",
          pushTo: "/admin/list-post/categories-post",
        },
        {
          icon: <FileTextOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách bài viết",
          pushTo: "/admin/list-post",
        },
      ],
    },

    // {
    //   text: "Nguyên liệu vi sinh",
    //   icon: <PictureOutlined />,
    //   listSubMenu: [
    //     {
    //       icon: (
    //         <FullscreenOutlined className={`${isCloseMenu && "text-xs"}`} />
    //       ),
    //       text: "Loại nguyên liệu",
    //       pushTo: "/admin/ingredient/categories-ingredient",
    //     },
    //     {
    //       icon: (
    //         <OrderedListOutlined className={`${isCloseMenu && "text-xs"}`} />
    //       ),
    //       text: "Danh sách nguyên liệu",
    //       pushTo: "/admin/ingredient",
    //     },
    //   ],
    // },
    // {
    //   text: "Gia công vi sinh",
    //   icon: <ScheduleOutlined />,
    //   pushTo: "/admin/machining",
    //   // listSubMenu: [
    //   //   {
    //   //     icon: <MenuOutlined className={`${isCloseMenu && "text-xs"}`} />,
    //   //     text: "Danh sách lịch hẹn",
    //   //     pushTo: "/admin/appointments",
    //   //   },
    //   // ],
    // },
    {
      text: "Quản lý Liên hệ",
      icon: <ContactsOutlined />,
      pushTo: "/admin/customer-contact",
      // listSubMenu: [
      //   {
      //     icon: <ContactsOutlined  className={`${isCloseMenu && "text-xs"}`} />,
      //     text: "Danh sách liên hệ",
      //     pushTo: "/admin/customer-contact",
      //   },
      // ],
    },
    {
      text: "Quản lý Video",
      icon: <VideoCameraAddOutlined />,
      pushTo: "/admin/videos",
    },
    {
      text: "Quản lý đơn hàng",
      icon: <ShoppingCartOutlined />,
      pushTo: "/admin/orders",
    },
    {
      text: "Quản lý Tài khoản",
      icon: <UserSwitchOutlined />,
      pushTo: "/admin/accounts-admin",
    },
  ];

  const handleClickItem = (index) => {
    if (indexItemSelected !== index) {
      setIndexItemSelected(index);
    } else {
      setIndexItemSelected(null);
    }
  };

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
  );
};

export default MenuSidebar;
