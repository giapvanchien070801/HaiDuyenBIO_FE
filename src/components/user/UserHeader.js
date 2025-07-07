"use client"
import layoutUserStyle from "@/styles/layout_user_style.module.css"
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
  SettingOutlined,
  AppstoreOutlined,
  MailOutlined,
  ProductOutlined,
  ContainerOutlined
} from "@ant-design/icons"
import Link from "next/link"
import { useQuery } from "react-query"
import Base from "@/models/Base"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Badge, Button, Popover, Input, Tooltip, Select, Menu } from "antd"
import CategoryProduct from "@/models/CategoryProduct"
import ListArticleByCategory from "./home-page/ListArticleByCategory"
import { handleCallHotline, removeEmptyFields, useDebounce } from "@/common/functions/commonFunction"
import Product from "@/models/Product"
import BadgeShop from "./home-page/BadgeShop"
import ArticleModal from "@/models/ArticleModal"

const { Search } = Input

export default function UserHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [cartTotal, setCartTotal] = useState(0)

  const [scrollY, setScrollY] = useState(0)
  const [header1Height, setHeader1Height] = useState(0)

  // api lấy danh sách tất cả thể loại
  const { data: listCategoryProduct } = useQuery(
    ["getListCategory-UserHeader-Product"],
    async () => {
      const res = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 1000,
        search: "",
        type: "PRODUCT"
      })

      return res?.content?.map(item => ({
        key: item?.id,
        label: item?.name,
        onClick: () => {
          router.push(`/product-list/${item?.id}`)
        }
      }))
    },
    {
      enabled: true
    }
  )

  // const { data: listArticle } = useQuery(
  //   ["getArticleList-UserHeader-Article"],
  //   async () => {
  //     const res = await ArticleModal.getArticleList({
  //       page: 0,
  //       size: 1000,
  //       search: "",
  //       type: "MENU"
  //     })

  //     return res?.content
  //   },
  //   {
  //     enabled: true
  //   }
  // )

  const { data: listCategoryMenu } = useQuery(
    ["getListCategory-UserHeader-Article"],
    async () => {
      const resArticle = await ArticleModal.getArticleList({
        page: 0,
        size: 1000,
        search: "",
        type: "MENU"
      })

      const resCategory = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 1000,
        search: "",
        type: "MENU"
      })

      return resCategory?.content?.map(item => ({
        key: item?.id,
        icon: <AppstoreOutlined />,
        label: item?.name,
        children: resArticle?.content
          ?.filter(article => +article?.categoryId === +item?.id)
          ?.map(article => ({
            key: article?.id,
            label: article?.title,
            onClick: () => {
              router.push(`/news/${item?.id}/${article?.id}`)
            }
          }))
      }))
    },
    {
      enabled: true
    }
  )

  const { data: listCategoryArticle } = useQuery(
    ["listCategoryArticle-UserHeader-Article"],
    async () => {
      const resCategory = await CategoryProduct.getCategoryProductList({
        page: 0,
        size: 1000,
        search: "",
        type: "ARTICLE"
      })

      return resCategory?.content?.map(item => ({
        key: item?.id,
        icon: <ContainerOutlined />,
        label: item?.name,
        onClick: () => {
          router.push(`/news/${item?.id}`)
        }
      }))
    },
    {
      enabled: true
    }
  )

  const [searchProduct, setSearchProduct] = useState("")
  const searchProductDebounce = useDebounce(searchProduct, 500)

  const { data: listProduct } = useQuery(
    ["getListProductPagination", searchProductDebounce],
    async () => {
      const params = {
        page: 0,
        size: 10,
        search: searchProductDebounce
      }
      const res = await Product.getProductList(removeEmptyFields(params))
      return res?.content?.map(item => ({
        label: item?.name,
        value: item?.id
      }))
    },
    {
      enabled: true
    }
  )

  const [activeMobileMenu, setActiveMobileMenu] = useState(false)

  useEffect(() => {
    setActiveMobileMenu(false)
  }, [pathname])

  // Xử lý scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lấy chiều cao của header 1
  useEffect(() => {
    if (typeof window !== "undefined") {
      const header1Element = document.querySelector(".header-1")
      if (header1Element) {
        setHeader1Height(header1Element.offsetHeight)
      }
    }
  }, [])

  // Tính toán transform cho header 1
  const header1Transform = Math.max(-header1Height, -scrollY)
  const header2Top = Math.max(0, header1Height + header1Transform)

  const items = [
    {
      key: "sub1",
      icon: <ProductOutlined />,
      label: "Sản phẩm",
      children: listCategoryProduct
    },

    ...(listCategoryMenu ? listCategoryMenu : [])
  ]

  return (
    <header className="relative">
      {/* header 1 */}
      <div
        className="header-1 z-20  bg-white"
        style={{
          transform: `translateY(${header1Transform}px)`,
          transition: "transform 0.4s ease-out"
        }}>
        <div className="container mx-auto flex justify-between py-5">
          <div className="items-center gap-5 hidden md:flex">
            <Link href={`/`} className="">
              <div className="flex items-center">
                <img src="/images/new_logo.png" className=" h-14" alt="logo" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-7 justify-between px-5 md:px-0 w-full md:w-auto">
            {/* gọi hotline */}
            <Button onClick={handleCallHotline} className="!bg-[#14457b] !text-white h-10" icon={<PhoneFilled />}>
              Hotline: 085 489 199
            </Button>
            {/* <div
              className="flex items-center gap-2 hover:text-cyan-600 transition-all duration-300 cursor-pointer"
              onClick={handleCallHotline}>
              <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full">
                <PhoneFilled className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">3</p>
                <p className="text-xs">Hỗ trợ tư vấn 24/7</p>
              </div>
            </div> */}

            <Link
              href={`/check-shopping`}
              className="flex items-center justify-center hover:text-cyan-600 transition-all duration-300 bg-[#14457b] w-10 h-10 rounded text-white">
              <Tooltip title="Tra cứu đơn hàng">
                <TruckOutlined className="mb-2 text-2xl transform translate-y-1/4" />
              </Tooltip>
            </Link>

            <BadgeShop />
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
          transition: "top 0 ease-out"
        }}>
        <div className="flex items-center justify-between w-full lg:w-3/4 text-white">
          <Popover
            content={
              <Menu className="w-auto" mode="vertical" items={items} />
              // <ul className="w-max bg-white">
              //   <li>
              //     <Popover
              //       content={
              //         <ul className="w-max bg-white">
              //           {listCategoryProduct?.map((category, index) => (
              //             <li key={index} className="w-full">
              //               {/* link đến tranh danh sách bài viết */}
              //               <Link
              //                 href={`/product-list/${category?.id}`}
              //                 as={`/product-list/${category?.id}`}
              //                 className="hover:text-white block hover:bg-cyan-600 py-2 px-8 transition-all duration-300 lg:px-4 lg:py-2 rounded">
              //                 {category?.name}
              //               </Link>
              //             </li>
              //           ))}
              //         </ul>
              //       }
              //       trigger="hover"
              //       placement="right">
              //       <Link
              //         href={`/product-list/-1`}
              //         className="h-full flex items-center hover:text-cyan-600 transition-all duration-300 p-2 w-full justify-between gap-4">
              //         Sản phẩm
              //         <RightOutlined />
              //       </Link>
              //     </Popover>
              //   </li>

              //   {listCategoryArticle?.map((category, index) => (
              //     <li>
              //       <Popover
              //         content={<ListArticleByCategory categoryId={category?.id} />}
              //         trigger="hover"
              //         placement="right">
              //         <Link
              //           href={`#`}
              //           className="h-full flex items-center  hover:text-cyan-600 transition-all duration-300 p-2 w-full justify-between gap-4">
              //           {category?.name}
              //           <RightOutlined />
              //         </Link>
              //       </Popover>
              //     </li>
              //   ))}
              // </ul>
            }
            trigger="hover"
            placement="bottom">
            <Link href={`/`} className="flex items-center gap-3 cursor-pointer ">
              <MenuOutlined className=" text-2xl" />
              <p className="hidden sm:block">MAIN MENU</p>
              <DownOutlined className="hidden lg:block" />
            </Link>
          </Popover>

          <div className="flex items-center w-2/3 lg:w-5/12">
            <Select
              options={listProduct}
              placeholder="Tìm kiếm..."
              size="middle"
              suffixIcon={<SearchOutlined />}
              className="w-full"
              showSearch
              allowClear
              onChange={value => {
                if (value) {
                  router.push(`/product-detail/${value}`)
                }
              }}
              optionFilterProp="label"
              onSearch={value => {
                setSearchProduct(value)
              }}
            />
            {/* <Input.Search
              placeholder="Tìm kiếm..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              className="w-full"
            /> */}
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
                <Popover
                  content={<Menu style={{ width: 200 }} mode="vertical" items={listCategoryArticle} />}
                  trigger="hover"
                  placement="bottom">
                  <Link
                    href={`/news`}
                    className="h-full flex items-center p-2 hover:text-cyan-600 transition-all duration-300 py-2">
                    <FileTextOutlined className="mr-2" />
                    <p>Tin tức</p>
                  </Link>
                </Popover>
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
  )
}
