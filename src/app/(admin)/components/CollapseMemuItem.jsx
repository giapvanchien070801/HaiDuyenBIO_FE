import { RightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

const CollapseMemuItem = (props) => {
  const {
    isCloseMenu, // biến kiểm tra menu bị đóng hay chưa
    isActive, // biến kiểm tra item menu có đang active hay không
    text,
    icon, // icon bên trái của menu
    onClick, // khi click  vào menu
    listSubMenu, // danh sách submenu
    pushTo, // link tới url nào
  } = props;

  const [indexItemSelected, setIndexItemSelected] = useState(null);

  useEffect(() => {
    setIndexItemSelected(null);
  }, [isActive]);

  const handleClickSubItem = (index) => {
    if (indexItemSelected !== index) {
      setIndexItemSelected(index);
    } else {
      setIndexItemSelected(null);
    }
  };

  return (
    <>
      <Tooltip
        color="orange"
        placement="right"
        title={text}
        open={isCloseMenu ? undefined : false}
      >
        <Link href={pushTo ? pushTo : ""}>
          <div
            onClick={onClick}
            className={`cursor-pointer item-collapse-menu w-full ${
              isActive && "bg-menu-active"
            } ${!isCloseMenu ? "justify-between" : "justify-center"}`}
          >
            <div className="flex">
              {icon}
              {!isCloseMenu && <p className="ml-3 text-menu">{text} </p>}
            </div>
            {!isCloseMenu && (
              <RightOutlined
                className={`icon-right-menu ${
                  isActive && listSubMenu?.length > 0 && "rotate-90"
                }`}
              />
            )}
          </div>
        </Link>
      </Tooltip>
      {isActive && (
        <div className="sub-menu-container ">
          {listSubMenu?.map((subMenu, index) => (
            <Tooltip
              color="cyan"
              key={index}
              placement="right"
              title={subMenu.text}
              open={isCloseMenu ? undefined : false}
            >
              <Link href={subMenu?.pushTo ? subMenu?.pushTo : ""}>
                <div
                  onClick={() => handleClickSubItem(index)}
                  className={`gap-2 text-sub-menu flex ${
                    indexItemSelected === index && "bg-submenu-active"
                  }  ${!isCloseMenu ? "pl-5 py-2" : "p-0 flex justify-center"}`}
                >
                  {subMenu?.icon}
                  {!isCloseMenu && <p className="text-menu">{subMenu?.text}</p>}
                </div>
              </Link>
            </Tooltip>
          ))}
        </div>
      )}
    </>
  );
};

export default CollapseMemuItem;
