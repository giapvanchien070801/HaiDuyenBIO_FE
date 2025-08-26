"use client"

import { HomeOutlined, ShoppingCartOutlined, ShoppingOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { useQuery } from "react-query"
import Base from "@/models/Base"
import { Breadcrumb, Button, InputNumber, message, Divider, Tag, Tabs } from "antd"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Product from "@/models/Product"
import RelatedProducts from "@/components/user/common-component/RelatedProducts"
import ListImgProduct from "@/components/user/product/ListImgProduct"
import DynamicPageTitle from "@/components/common/DynamicPageTitle"
import QuillContent from "@/components/common/QuillContent"

export default function ProductDetailPage({ params }) {
  // Sử dụng query param từ URL
  const idProduct = params?.id
  const [quantity, setQuantity] = useState(1)
  const [listProducts, setListProducts] = useState([])
  const router = useRouter()

  // Mock data cho sản phẩm
  const mockProduct = {
    id: 2,
    name: "Men vi sinh Lacto",
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg"
    ],
    price: 380000,
    oldPrice: 420000,
    discount: 15,
    quantity: 6,
    subDescription:
      "Men Sinh Học EM GỐC SUPER được thiết kế đặc biệt để tối ưu hóa quá trình thuỷ phân đạm cá và chất thải hữu cơ trong môi trường chăn nuôi, thuỷ sản. Sản phẩm giúp phân giải chất đạm một cách hiệu quả hơn, ứng dụng cho nhiều công việc và quá trình.",
    description:
      "Men vi sinh Lacto là sản phẩm chất lượng cao được nghiên cứu và phát triển bởi đội ngũ chuyên gia hàng đầu. Sản phẩm được sản xuất theo công nghệ tiên tiến, đảm bảo chất lượng và hiệu quả tối ưu cho người sử dụng."
  }

  // Load listProducts from localStorage on component mount
  useEffect(() => {
    const savedListProducts = localStorage.getItem("listProducts")
    if (savedListProducts) {
      setListProducts(JSON.parse(savedListProducts))
    }
  }, [])

  // const { data: dataProduct, isFetching } = useQuery(
  //   ["getDetailProduct", idProduct],
  //   async () => {
  //     const res = await Base.getDetailProduct(idProduct);
  //     return res;
  //   },
  //   { enabled: !!idProduct }
  // );

  const { data: dataDetail } = useQuery(
    ["getDetail", idProduct],
    async () => {
      const res = await Product.getProductDetail(idProduct)

      return res
    },
    { enabled: !!idProduct }
  )

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      )
    },
    {
      href: `/product-list/${dataDetail?.categoryId}`,
      title: (
        <>
          <span className="text-[#2490eb]">Danh sách sản phẩm</span>
        </>
      )
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Chi tiết sản phẩm</span>
        </>
      )
    }
  ]

  // Function to add product to cart
  const addToCart = () => {
    // Validate quantity
    if (quantity < 1) {
      message.error("Số lượng không hợp lệ!")
      return
    }

    // Get current listProducts from localStorage
    const existingListProducts = localStorage.getItem("listProducts")
    let currentListProducts = existingListProducts ? JSON.parse(existingListProducts) : []

    // Check if product already exists in listProducts
    const existingProductIndex = currentListProducts.findIndex(item => item.id === mockProduct.id)

    if (existingProductIndex !== -1) {
      // If product exists, update quantity with current input value
      currentListProducts[existingProductIndex].quantity = quantity
    } else {
      // If product doesn't exist, add new product with current quantity
      currentListProducts.push({
        ...mockProduct,
        quantity: quantity
      })
    }

    // Save updated listProducts to localStorage
    localStorage.setItem("listProducts", JSON.stringify(currentListProducts))

    // Update state
    setListProducts(currentListProducts)

    // Show success message
    message.success("Đã thêm sản phẩm vào giỏ hàng!")
  }

  // Function to buy now
  const buyNow = () => {
    localStorage.setItem("selectedProducts", JSON.stringify([{ ...mockProduct, quantity: quantity }]))
    router.push("/shopping/step2")
  }

  // Function to handle quantity increase
  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  // Function to handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  //   {
  //     "slug": "sdsdfdsf",
  //     "name": "Sản phẩm 12h13, sửa lúc 12h 38",
  //     "description": "<h2><strong>1. Thành phần của men EM GỐC SUPER</strong></h2><p>Trong men EM GỐC SUPER có chứa các thành phần chính là các chủng vi sinh vật có lợi đó là:</p><ul><li>Saccharomyces cerevisiae:&nbsp;10^10 cfu/L</li><li>Bacillus licheniformis:&nbsp;10^10 cfu/L</li><li>Bacillus subtillis:&nbsp;10^10 cfu/L</li></ul><h2><strong>2. Tác dụng&nbsp;men EM GỐC SUPER</strong></h2><p>Men EM GỐC SUPER đem đến những công dụng tuyệt vời, phù hợp ứng dụng cho nhiều lĩnh vực. Đó là:</p><ul><li>Men EM GỐC SUPER chính là chìa khóa nuôi ruồi lính đen, phun chuồng trại tiên tiến và ủ phân bón cây trồng.</li><li>Phân giải chất hữu cơ thải, ứng dụng trong xử lý môi trường chăn nuôi, thuỷ sản.</li><li>Ức chế các vi sinh vật, yếu tố gây hại trong nguyên liệu, môi trường, tăng cường các vi sinh vật có ích.</li><li>Tăng hiệu quả sử dụng chất hữu cơ trong phân bón, môi trường chăn nuôi.</li></ul><p><strong><img src=\"https://visinhjapan.com/wp-content/uploads/2025/06/Artboard-1@4x-100-1024x768.jpg\"></strong><em>Men Sinh Học EM GỐC SUPER được thiết kế đặc biệt để tối ưu hóa quá trình thuỷ phân đạm cá và chất thải hữu cơ trong môi trường chăn nuôi thuỷ sản. Sản phẩm giúp phân giải chất đạm một cách hiệu quả hơn và có thể ứng dụng cho nhiều lĩnh vực khác nhau.</em></p><p>&nbsp;</p><h2><strong>3. Hướng dẫn sử dụng men EM GỐC SUPER</strong></h2><p>Sau đây chúng tôi xin hướng dẫn bà con cách sử dụng men EM GỐC SUPER để sử dụng đúng cách:</p><ul><li>Quy trình nhân sinh khối: 1L EM GỐC SUPER + 5 kg mật rỉ đường + 100 lit nước. Ủ kín trong 48 giờ thu được sản phẩm cấp 1 sử dụng cho các mục đích khác nhau (nuôi ruồi lính đen, phun chuồng trại, tạo đệm lót sinh học cho chuồng trại,…).</li><li>Quy trình ủ đạm hữu cơ (cá, đỗ tương, rau củ…): 1L EM GỐC SUPER + 5 kg mật rỉ đường + 100kg nguyên liệu hữu cơ (cá, đỗ tương, rau củ…) + 5 kg cám gạo. Trộn đều và cho vào trùng phuy 200 lit. Đổ 50% nước, khuấy đều, đậy kín sau 30 ngày. Sử dụng tưới cho cây trồng hoặc làm dinh dưỡng thức ăn chăn nuôi.</li><li>Quy trình ủ rác hữu cơ: 1L EM GỐC SUPER + 100 ~ 200 kg rác hữu cơ. Trộn đều và đậy kín lại sau 20 – 30 ngày có thể sử dụng bón cây trồng.&nbsp;</li><li><strong><img src=\"https://visinhjapan.com/wp-content/uploads/2025/06/Artboard-1-copy@4x-100-1024x768.jpg\"></strong><em>Men Sinh Học EM GỐC SUPER được thiết kế đặc biệt để tối ưu hóa quá trình thuỷ phân đạm cá và chất thải hữu cơ trong môi trường chăn nuôi thuỷ sản. Sản phẩm giúp phân giải chất đạm một cách hiệu quả hơn và có thể ứng dụng cho nhiều lĩnh vực khác nhau.</em></li></ul><h2><strong>4. Một số lưu ý khi sử dụng men EM GỐC SUPER</strong></h2><p>Trên đây chúng tôi đã hướng dẫn bà con cách sử dụng. Và trong quá trình sử dụng men thì bà con cần lưu ý một số vấn đề sau:</p><ul><li>Đọc kỹ hướng dẫn sử dụng của nhà sản xuất trước khi sử dụng sản phẩm.</li><li>Bảo quản men EM GỐC SUPER ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.</li><li>Nếu không sử dụng hết men hãy bảo quản kỹ, tránh ẩm mốc, gây vón cục, ảnh hưởng tới chất lượng men.</li></ul><p><strong><img src=\"https://visinhjapan.com/wp-content/uploads/2025/06/Artboard-1-copy-2@4x-100-1024x768.jpg\"></strong><em>Men Sinh Học EM GỐC SUPER được thiết kế đặc biệt để tối ưu hóa quá trình thuỷ phân đạm cá và chất thải hữu cơ trong môi trường chăn nuôi thuỷ sản. Sản phẩm giúp phân giải chất đạm một cách hiệu quả hơn và có thể ứng dụng cho nhiều lĩnh vực khác nhau.</em></p><h2><strong>Mua EM GỐC SUPER&nbsp;ở đâu uy tín?</strong></h2><p>Hiện nay, EM GỐC SUPER đã có mặt ở hầu khắp các địa phương trên cả nước với nhiều đại lý phân phối. Để có thể mua hàng chính hãng thì bà con nên làm theo các bước hướng dẫn sau đây:</p><ul><li>Đặt hàng trực tiếp ngay trên website:&nbsp;<strong>visinhjapan.com</strong>&nbsp;hoặc liên hệ hotline:&nbsp;<strong>0985 209 921</strong>&nbsp;để gặp nhân viên chăm sóc khách hàng và được tư vấn chi tiết sản phẩm. Hoặc nhân viên sẽ hướng dẫn quý bà con đến với các đại lý gần nhất để mua hàng.</li><li>Bà con có thể đến trực tiếp tại các đại lý gần khu vực chăn nuôi hoặc nơi mình sinh sống để mua hàng.</li><li>Bà con có thể mua EM GỐC SUPER tại:</li></ul><p><strong>CÔNG TY TNHH ỨNG DỤNG CÔNG NGHỆ VI SINH JAPAN</strong></p><p><strong>Địa chỉ: Nam Điện – Nam Dương – Tx. Chũ – Bắc Giang</strong></p><p><strong>Liên hệ: 0985 209 921</strong></p><p><strong>—————————————————</strong></p><p><strong>➨ Theo dõi kênh:&nbsp;</strong><a href=\"https://www.youtube.com/@LeDuyChu\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.youtube.com/@LeDuyChu</a></p><p><strong>➨ Fanpage:&nbsp;</strong><a href=\"https://www.facebook.com/congtyvisinhjapan\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.facebook.com/congtyvisinhjapan</a></p><p><strong>➨ Website:&nbsp;</strong><a href=\"http://visinhjapan.com/\" rel=\"noopener noreferrer\" target=\"_blank\">http://visinhjapan.com/</a></p>",
  //     "price": 10000000,
  //     "imageUrl": [],
  //     "stock": 10,
  //     "categoryId": 10,
  //     "summary": "mô tả ngắn của sản pẩme",
  //     "createdAt": "2025-06-25 17:14:15",
  //     "categoryName": "Men Vi Sinh Thực Phẩm",
  //     "priceFrom": 8500000,
  //     "discountPercent": 15,
  //     "discountValue": null
  // }

  // Create tabs for images
  const imageTabs = dataDetail?.imageUrl?.map((image, index) => ({
    key: index.toString(),
    label: `Ảnh ${index + 1}`,
    children: (
      <div className="rounded-lg shadow-md">
        <div className="h-96 w-full relative">
          <img
            src={image}
            alt={`${dataDetail?.name} - Ảnh ${index + 1}`}
            className="w-full h-full object-cover scale-75"
          />
          <div className="absolute top-4 left-4">
            <Tag color="red" className="font-bold">
              -{dataDetail?.discountPercent}%
            </Tag>
          </div>
        </div>
      </div>
    )
  }))

  const listSliderFake = [
    "/images/vi-sinh-xu-ly-nuoc-min_banner1.jpg",
    "/images/sieu-men-duong-ruot-min_banner2.jpg",
    "/images/men-i-sinh-xu-ly-ao-nuoi-min_banner_3.jpg"
  ]

  return (
    <>
      <DynamicPageTitle title={dataDetail?.name || "Chi tiết sản phẩm"} />
      <div className="pb-24 container-original mx-auto">
        <div className=" mt-12  flex justify-center">
          <div className=" bg-white md:px-0 px-4">
            <Breadcrumb className="my-5" items={breadcrumb} />

            {/* Product Detail Section */}
            <div className="grid  grid-cols-1 md:grid-cols-2 p-6 gap-10">
              {/* Product Image */}
              <div className="col-span-1">
                <div className="">
                  <ListImgProduct listImg={dataDetail?.imageUrl} />
                </div>
              </div>

              {/* Product Info */}
              <div className="col-span-1">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{dataDetail?.name}</h1>
                  <p className="text-gray-600 text-sm leading-relaxed">{dataDetail?.summary}</p>
                </div>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-red-500">
                      {dataDetail?.priceFrom.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {dataDetail?.price.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Tiết kiệm: {(dataDetail?.priceFrom - dataDetail?.price).toLocaleString("vi-VN")}đ
                  </p>
                </div>

                {/* Quantity Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Số lượng:</label>
                  <div className="flex items-center gap-3">
                    <Button
                      icon={<MinusOutlined />}
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="flex items-center justify-center"
                    />
                    <InputNumber
                      min={1}
                      // max={mockProduct.quantity}
                      value={quantity}
                      onChange={setQuantity}
                      className="w-24"
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={handleIncrease}
                      // disabled={quantity >= mockProduct.quantity}
                      className="flex items-center justify-center"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className=" pt-4 flex flex-col md:flex-row gap-3">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={addToCart}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    size="large"
                    icon={<ShoppingOutlined />}
                    onClick={buyNow}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white !m-0">
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
            <div className=" px-5 md:px-10 ">
              <div>
                <Divider />
                <p className="text-lg font-semibold text-gray-800 mb-3">Mô tả sản phẩm</p>
                <QuillContent content={dataDetail?.description} className="text-gray-600 leading-relaxed" />
              </div>
            </div>
            <RelatedProducts currentCategoryId={dataDetail?.categoryId} currentProductId={idProduct} />
          </div>
        </div>
      </div>
    </>
  )
}
