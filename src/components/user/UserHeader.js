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
  TruckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Badge, Button, Popover, Input, Tooltip } from "antd";
import CategoryProduct from "@/models/CategoryProduct";

const { Search } = Input;

export default function UserHeader() {
  const pathname = usePathname();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [header1Height, setHeader1Height] = useState(0);

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getListCategory-UserHeader"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList({
        Page: 1,
        Size: 1000,
        search: "",
      });

      return res?.content;
    },
    {
      enabled: true,
    }
  );

  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  useEffect(() => {
    setActiveMobileMenu(false);
  }, [pathname]);

  // Tính toán tổng giá trị giỏ hàng từ localStorage
  const calculateCartTotal = () => {
    try {
      const listProducts = JSON.parse(
        localStorage.getItem("listProducts") || "[]"
      );
      const total = listProducts.reduce((sum, product) => {
        return sum + (product.price || 0);
      }, 0);
      setCartTotal(total);
      setCartCount(listProducts.length);
    } catch (error) {
      setCartTotal(0);
      setCartCount(0);
    }
  };

  useEffect(() => {
    calculateCartTotal();

    // Lắng nghe sự thay đổi của localStorage
    const handleStorageChange = () => {
      calculateCartTotal();
    };

    // Lắng nghe custom event để cập nhật ngay lập tức
    const handleCartUpdate = () => {
      calculateCartTotal();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Thêm event listener cho custom event cartItemAdded
    window.addEventListener("cartItemAdded", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("cartItemAdded", handleCartUpdate);
    };
  }, []);

  // Xử lý scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lấy chiều cao của header 1
  useEffect(() => {
    if (typeof window !== "undefined") {
      const header1Element = document.querySelector(".header-1");
      if (header1Element) {
        setHeader1Height(header1Element.offsetHeight);
      }
    }
  }, []);

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

  // Tính toán transform cho header 1
  const header1Transform = Math.max(-header1Height, -scrollY);
  const header2Top = Math.max(0, header1Height + header1Transform);

  return (
    <header className="relative">
      {/* header 1 */}
      <div
        className="header-1 z-20  bg-white"
        style={{
          transform: `translateY(${header1Transform}px)`,
          transition: "transform 0.4s ease-out",
        }}>
        <div className="container mx-auto flex justify-between py-5">
          <div className="items-center gap-5 hidden md:flex">
            <Link href={`/`} className="">
              <div className="flex items-center">
                <img
                  src="/images/logo-haiduyenbio-1.png"
                  className=" h-14"
                  alt="logo"
                />
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full">
                <PhoneFilled className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">Hotline: 085 489 1993</p>
                <p className="text-xs">Hỗ trợ tư vấn 24/7</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-7 justify-between px-5 md:px-0 w-full md:w-auto">
            <Link href={`/check-shopping`} className="flex items-center gap-2">
              <TruckOutlined className="mb-2" />
              <p className=" text-sm font-medium ">Kiểm tra đơn hàng</p>
            </Link>
            <Link href={`/shopping/step1`}>
              <Badge count={cartCount}>
                <Tooltip title="Giỏ hàng">
                  <ShoppingOutlined className="text-4xl cursor-pointer flex  " />
                </Tooltip>
              </Badge>
            </Link>
            <div className="hidden md:block">
              <p className=" text-sm font-medium text-[#777]">Giỏ hàng</p>
              <p className=" text-xs underline">
                {cartTotal.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* header 2 */}
      <div
        className="bg-[#14457b] py-4 lg:px-0 px-4 flex lg:justify-center justify-between z-50"
        style={{
          position: "fixed",
          top: `${header2Top}px`,
          left: 0,
          right: 0,
          transition: "top 0 ease-out",
        }}>
        <div className="flex items-center justify-between w-full lg:w-3/4 text-white">
          <Popover
            content={
              <ul className="w-max bg-white">
                <li>
                  <Popover
                    content={
                      <ul className="w-max bg-white">
                        {listCategory?.map((category, index) => (
                          <li key={index} className="w-full">
                            {/* link đến tranh danh sách bài viết */}
                            <Link
                              href={`/product-list/${category?.id}`}
                              as={`/product-list/${category?.id}`}
                              className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded">
                              {category?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                    trigger="hover"
                    placement="right">
                    <Link
                      href={`/product-list/-1`}
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
                          <ul key={index} className="w-max bg-white">
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
            <Link
              href={`/`}
              className="flex items-center gap-3 cursor-pointer ">
              <MenuOutlined className=" text-2xl" />
              <p className="hidden sm:block">MAIN MENU</p>
              <DownOutlined className="hidden lg:block" />
            </Link>
          </Popover>

          <div className="flex items-center w-2/3 lg:w-5/12">
            <Input.Search
              placeholder="Tìm kiếm..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              className="w-full"
            />
          </div>

          <div className=" self-stretch lg:static absolute  z-10 top-full w-full lg:w-fit left-0">
            <ul
              className={`lg:flex items-center h-full md:container md:mx-auto lg:p-0 p-4 gap-2 ${
                activeMobileMenu ? "lg:block" : "hidden lg:block"
              }`}>
              {/* <li className="h-full relative">
                <Link
                  href={`/`}
                  className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2">
                  <HomeOutlined className="mr-2" />
                  <p>Trang chủ</p>
                </Link>
              </li> */}
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
