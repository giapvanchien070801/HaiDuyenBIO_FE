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

const { Search } = Input;

export default function UserHeader() {
  const pathname = usePathname();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

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
      console.error("Error calculating cart total:", error);
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
            <Link href={`/`} className="">
              <div className="flex items-center">
                <img src="/images/logo-haiduyenbio-1.png" className=" h-14" />
              </div>
            </Link>
            <p className="flex">
              <PhoneFilled /> <span className="mx-2">085.489.1993</span>
            </p>
          </div>

          <div className="flex items-center gap-7">
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
            <div>
              <p className=" text-sm font-medium text-[#777]">Giỏ hàng</p>
              <p className=" text-xs underline">
                {cartTotal.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="  bg-[#14457b] py-4 lg:px-0 px-4  flex  lg:justify-center justify-between">
        {/* <Link href={`/`} className="lg:hidden xl:block">
          <div className="flex items-center">
            <img src="/images/logo-haiduyenbio-1.png" className=" h-14" />
          </div>
        </Link> */}

        <div className="flex  items-center  justify-between w-full lg:w-3/4 text-white">
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

          <div className="flex items-center w-3/4 lg:w-auto">
            <input
              type="hidden"
              style={{ display: "none" }}
              aria-hidden="true"
            />
            <Search
              placeholder="Tìm kiếm..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full lg:w-[250px] md:w-[200px] sm:w-[180px] lg:mr-0 mr-4"
              onSearch={(value) => {
                // Xử lý tìm kiếm ở đây
                console.log("Tìm kiếm:", value);
              }}
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
