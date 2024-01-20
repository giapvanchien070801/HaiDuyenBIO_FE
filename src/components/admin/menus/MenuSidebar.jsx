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
    {
      text: "Quản trị nội dung",
      icon: <FileSearchOutlined />,
      listSubMenu: [
        {
          icon: (
            <UnorderedListOutlined className={`${isCloseMenu && "text-xs"}`} />
          ),
          text: "Danh mục bài viết",
          pushTo: "/admin/categorys",
        },
        {
          icon: <FileTextOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách bài viết",
          pushTo: "/admin/list-post",
        },
      ],
    },

    {
      text: "Quản lý Đội ngũ",
      icon: <UsergroupAddOutlined />,
      listSubMenu: [
        {
          icon: <MenuOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách nhân sự",
          pushTo: "/admin/list-employee",
        },
      ],
    },
    {
      text: "Quản lý Khoa",
      icon: <PartitionOutlined />,
      listSubMenu: [
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách Khoa",
          pushTo: "/admin/departments",
        },
      ],
    },
    {
      text: "Quản lý Dịch vụ",
      icon: <InsertRowAboveOutlined />,
      listSubMenu: [
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách Dịch vụ",
          pushTo: "/admin/service",
        },
      ],
    },

    {
      text: "Quản lý Slide",
      icon: <PictureOutlined />,
      listSubMenu: [
        {
          icon: <PictureOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách ảnh",
          pushTo: "/admin/list-image",
        },
      ],
    },

    {
      text: "Quản lý Liên hệ",
      icon: <ContactsOutlined />,
      listSubMenu: [
        {
          icon: <UploadOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách liên hệ",
          pushTo: "/admin/customer-contact",
        },
      ],
    },
    {
      text: "Quản lý Lịch hẹn",
      icon: <ScheduleOutlined />,
      listSubMenu: [
        {
          icon: <MenuOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách lịch hẹn",
          pushTo: "/admin/appointments",
        },
      ],
    },

    {
      text: "Quản lý Tài khoản",
      icon: <UserSwitchOutlined />,
      listSubMenu: [
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Danh sách tài khoản",
          pushTo: "/admin/accounts-admin",
        },
      ],
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
