"use client";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import {
  DownOutlined,
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  MenuOutlined,
  ShoppingOutlined,
  RightOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge, Button, Popover, Tooltip } from "antd";

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
      <div className={` z-20 hidden md:block`}>
        <div className="container mx-auto  flex justify-between py-5">
          <div className="flex items-center gap-5">
            <Link href={`/`} className="lg:hidden xl:block">
              <div className="flex items-center">
                <img src="/images/logo-haiduyenbio-1.png" className=" h-14" />
              </div>
            </Link>
            <p className="flex">
              <PhoneFilled /> <span className="mx-2">085.489.1993</span>
            </p>
            <p className="flex">
              <MailFilled /> <span className="mx-2">HaiDuyenBIO@gmail.com</span>
            </p>
          </div>

          
            <Link href={`/shopping/step1`} className="hover:bg-cyan-400 flex items-center gap-7 p-2">
              <Badge count={5}>
                <Tooltip title="Giỏ hàng">
                  <ShoppingOutlined className="text-4xl cursor-pointer flex  " />
                </Tooltip>
              </Badge>
              <div>
                <p className=" text-sm font-medium text-[#777]">Giỏ hàng</p>
                <p className=" text-xs underline">0đ</p>
              </div>
            </Link>
         
        </div>
      </div>

      <div className="  bg-[#14457b] py-4 lg:px-0 px-4 flex justify-center">
        {/* <Link href={`/`} className="lg:hidden xl:block">
          <div className="flex items-center">
            <img src="/images/logo-haiduyenbio-1.png" className=" h-14" />
          </div>
        </Link> */}

        <div className="flex  items-center  justify-between w-3/4 text-white">
          <Popover
            content={
              <ul className="w-max bg-white">
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
                              className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded">
                              {social?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                    trigger="hover"
                    placement="right">
                    <Link
                      href={`#`}
                      className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2 w-full justify-between gap-4">
                      Sản phẩm
                      <RightOutlined />
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
                                  href={`/news/${submenu?.id}`}
                                  as={`/news/${submenu?.id}`}
                                  className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded">
                                  {submenu?.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    }
                    trigger="hover"
                    placement="right">
                    <Link
                      href={`#`}
                      className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2 w-full justify-between gap-4">
                      Nguyên liệu vi sinh
                      <RightOutlined />
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
                              href={`/news/${social?.id}`}
                              as={`/news/${social?.id}`}
                              className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded">
                              {social?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                    trigger="hover"
                    placement="right">
                    <Link
                      href={`#`}
                      className="h-full flex items-center  hover:text-cyan-600 transition-all duration-300 p-2 w-full justify-between gap-4">
                      Gia công vi sinh
                      <RightOutlined />
                    </Link>
                  </Popover>
                </li>
              </ul>
            }
            trigger="hover"
            placement="bottom">
            <div className="flex items-center gap-3 cursor-pointer">
              <MenuOutlined className=" text-2xl" />
              <p>MAIN MENU</p>
              <DownOutlined />
            </div>
          </Popover>

          <div className=" self-stretch lg:static absolute  z-10 top-full w-full lg:w-fit left-0">
            <ul
              className={`lg:flex items-center h-full md:container md:mx-auto lg:p-0 p-4 gap-2 ${
                activeMobileMenu ? "lg:block" : "hidden lg:block"
              }`}>
              <li className="h-full relative">
                <Link
                  href={`/`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2">
                  <HomeOutlined className="mr-2" />
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li className="h-full relative">
                <Link
                  href={`/about`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2">
                  <InfoCircleOutlined className="mr-2" />
                  <p>Giới thiệu</p>
                </Link>
              </li>

              <li className="h-full relative">
                <Link
                  href={`/news`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2">
                  <FileTextOutlined className="mr-2" />
                  <p>Tin tức</p>
                </Link>
              </li>

              <li className="h-full relative">
                <Link
                  href={`/list-videos`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2">
                  <PlayCircleOutlined className="mr-2" />
                  Video
                </Link>
              </li>
              <li className="h-full relative">
                <Link
                  href={`/contact`}
                  className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2">
                  <ContactsOutlined className="mr-2" />
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
