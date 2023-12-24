import { useState } from "react";

import {
  HomeOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
  MenuOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  BellOutlined,
  UploadOutlined,
  ApartmentOutlined,
  ClusterOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  PartitionOutlined,
  OrderedListOutlined,
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
          text: "Các trang chính",
          pushTo: "/admin/list-main-page",
        },
        {
          icon: <FileTextOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Các bài viết",
          pushTo: "/admin/list-post",
        },
        {
          icon: <BellOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Thông báo nội bộ",
          pushTo: "/admin/internal-notifications",
        },
      ],
    },
    {
      text: "Quản lý File",
      icon: <FolderOpenOutlined />,
      listSubMenu: [
        {
          icon: <UploadOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Upload - Download File",
          pushTo: "/admin/files-manage",
        },
      ],
    },
    {
      text: "Quản lý Menu",
      icon: <OrderedListOutlined />,
      listSubMenu: [
        {
          icon: <MenuOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Menu chính",
          pushTo: "/admin/main-menus",
        },
        {
          icon: <ApartmentOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Các nút lệnh",
          pushTo: "/admin/buttons",
        },
        {
          icon: <ClusterOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Chức năng nội bộ",
          pushTo: "/admin/internal-function",
        },
      ],
    },
    {
      text: "Quản lý Tài khoản",
      icon: <UsergroupAddOutlined />,
      listSubMenu: [
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Tài khoản quản trị",
          pushTo: "/admin/accounts-admin",
        },
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Tài khoản nhân viên",
          pushTo: "/admin/accounts-employees",
        },
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Tài khoản bệnh nhân",
          pushTo: "/admin/accounts-patient",
        },
      ],
    },
    {
      text: "Phân quyền tài khoản",
      icon: <PartitionOutlined />,
      listSubMenu: [
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Tài khoản quản trị",
          pushTo: "/admin/accounts-admin",
        },
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Tài khoản nhân viên",
          pushTo: "/admin/accounts-employees",
        },
        {
          icon: <UserOutlined className={`${isCloseMenu && "text-xs"}`} />,
          text: "Tài khoản bệnh nhân",
          pushTo: "/admin/accounts-patient",
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
