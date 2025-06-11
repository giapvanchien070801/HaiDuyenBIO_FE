"use client";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  DownOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  MenuOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Popover } from "antd";

export default function UserHeader() {
  const pathname = usePathname();

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCate"],
    async () => {
      const res = await Base.getAllCategory();
      return res;
    },
    {}
  );

  // api lấy danh sách tất cả khoa
  const { data: listDepartment } = useQuery(
    ["getAllDepartment"],
    async () => {
      const res = await Base.getAllDepartment();
      return res;
    },
    {}
  );

  // api lấy danh sách tất cả dịch vụ
  const { data: listService } = useQuery(
    ["getAllServiceUser"],
    async () => {
      const res = await Base.getAllService();
      return res;
    },
    {}
  );

  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  useEffect(() => {
    setActiveMobileMenu(false);
  }, [pathname]);

  const toggleMenuMobile = () => {
    setActiveMobileMenu(!activeMobileMenu);
  };

  const listSocial = [
    {
      id: 1,
      name: "Menu 1",
    },
    {
      id: 2,
      name: "Menu 2",
    },
    {
      id: 3,
      name: "Menu 3",
    },
    {
      id: 4,
      name: "Menu 4",
    },
    {
      id: 5,
      name: "Menu 5",
    },
  ];

  const menu2 = [
    {
      id: 1,
      menu: "Menu 1",
      submenu: [
        {
          id: 1,
          name: "Submenu 1",
        },
        {
          id: 2,
          name: "Submenu 2",
        },
        {
          id: 3,
          name: "Submenu 3",
        },
      ],
    },
    {
      id: 2,
      menu: "Menu 2",
      submenu: [
        {
          id: 1,
          name: "Submenu 1",
        },
        {
          id: 2,
          name: "Submenu 2",
        },
        {
          id: 3,
          name: "Submenu 3",
        },
      ],
    },
  ];

  return (
    <header className="z-20 relative">
      <div
        className={`${layoutUserStyle.background_info_top} z-20 hidden md:block`}
      >
        <div className="container mx-auto text-white flex justify-between">
          <div className="flex items-center">
            <p className="px-2 flex">
              <PhoneFilled /> <span className="mx-2">085.489.1993</span>
            </p>
            <p className="px-2 flex">
              <MailFilled /> <span className="mx-2">HaiDuyenBIO@gmail.com</span>
            </p>
          </div>

          <div className="flex items-center">
            <Link
              href={`https://www.facebook.com/profile.php?id=100057086214537&mibextid=ZbWKwL`}
              className="text-lg p-2 flex hover:bg-cyan-400"
            >
              <FacebookFilled />
            </Link>
            <Link
              href={`https://zalo.me/0867585366`}
              className="text-lg m-2 p-1 flex hover:bg-cyan-400"
            >
              Zalo
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center z-20 bg-white py-4 lg:px-0 px-4">
        <Link href={`/`} className="lg:hidden xl:block">
          <div className="flex items-center">
            <img src="/images/logo-haiduyenbio-1.png" className=" h-14" />
          </div>
        </Link>

        <div className="flex justify-between lg:w-full xl:w-fit">
          <div className="navbar self-stretch lg:static absolute bg-white z-10 top-full w-full lg:w-fit left-0">
            <ul
              className={`lg:flex items-center h-full md:container md:mx-auto lg:p-0 p-4 gap-2 ${
                activeMobileMenu ? "lg:block" : "hidden lg:block"
              }`}
            >
              <li className="h-full relative">
                <Link
                  href={`/`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2"
                >
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li className="h-full relative">
                <Link
                  href={`/about`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2"
                >
                  <p>Giới thiệu</p>
                </Link>
              </li>

              <li>
                <Popover
                  content={
                    <ul className="w-max bg-white">
                      {listSocial?.map((social, index) => (
                        <li key={index} className="w-full">
                          {/* link đến tranh danh sách bài viết */}
                          <Link
                            href={`/product-detail/${social?.id}`}
                            as={`/product-detail/${social?.id}`}
                            className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded"
                          >
                            {social?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  }
                  trigger="hover"
                  placement="bottom"
                >
                  <Link
                    href={`#`}
                    className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                  >
                    Sản phẩm
                    <DownOutlined
                      style={{ fontSize: "14px", marginLeft: "5px" }}
                    />
                  </Link>
                </Popover>
              </li>

              <li>
                <Popover
                  content={
                    <div className="flex gap-4">
                      {menu2?.map((menu, index) => (
                        <ul className="w-max bg-white">
                          <li className="text-lg font-bold">{menu?.menu}</li>
                          {menu?.submenu?.map((submenu, index) => (
                            <li key={index} className="w-full">
                              <Link
                                href={`/service-detail/${submenu?.id}`}
                                as={`/service-detail/${submenu?.id}`}
                                className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded"
                              >
                                {submenu?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  }
                  trigger="hover"
                  placement="bottom"
                >
                  <Link
                    href={`#`}
                    className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                  >
                    Nguyên liệu vi sinh
                    <DownOutlined
                      style={{ fontSize: "14px", marginLeft: "5px" }}
                    />
                  </Link>
                </Popover>
              </li>

              <li>
                <Popover
                  content={
                    <ul className="w-max bg-white">
                      {listSocial?.map((social, index) => (
                        <li key={index} className="w-full">
                          {/* link đến tranh danh sách bài viết */}
                          <Link
                            href={`/department-detail/${social?.id}`}
                            as={`/department-detail/${social?.id}`}
                            className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded"
                          >
                            {social?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  }
                  trigger="hover"
                  placement="bottom"
                >
                  <Link
                    href={`#`}
                    className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                  >
                    Gia công vi sinh
                    <DownOutlined
                      style={{ fontSize: "14px", marginLeft: "5px" }}
                    />
                  </Link>
                </Popover>
              </li>

              <li className="h-full relative">
                <Link
                  href={`/news`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2"
                >
                  <p>Tin tức</p>
                </Link>
              </li>

              <li className="h-full relative">
                <Link
                  href={`/list-videos`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2"
                >
                  Video
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href={`/contact`}
            className={`transition-all ml-2 duration-300 flex items-center lg:p-4 lg:mr-2 p-2 py-4 text-white rounded-md hover:bg-[#14457b] !bg-[#2cb1ab]`}
          >
            Liên hệ +
          </Link>

          <div className="search flex lg:hidden block">
            <button
              className="block lg:hidden p-4 session_ocean2 rounded-md text-white ml-2"
              onClick={() => toggleMenuMobile()}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
