"use client";

import {
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import Base from "@/models/Base";
import {
  Breadcrumb,
  Button,
  InputNumber,
  message,
  Divider,
  Tag,
  Tabs,
} from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }) {
  // Sử dụng query param từ URL
  const idProduct = params?.id;
  const [quantity, setQuantity] = useState(1);
  const [listProducts, setListProducts] = useState([]);
  const router = useRouter();

  // Mock data cho sản phẩm
  const mockProduct = {
    id: 2,
    name: "Men vi sinh Lacto",
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
    ],
    price: 380000,
    oldPrice: 420000,
    discount: 15,
    quantity: 6,
    subDescription:
      "Men Sinh Học EM GỐC SUPER được thiết kế đặc biệt để tối ưu hóa quá trình thuỷ phân đạm cá và chất thải hữu cơ trong môi trường chăn nuôi, thuỷ sản. Sản phẩm giúp phân giải chất đạm một cách hiệu quả hơn, ứng dụng cho nhiều công việc và quá trình.",
    description:
      "Men vi sinh Lacto là sản phẩm chất lượng cao được nghiên cứu và phát triển bởi đội ngũ chuyên gia hàng đầu. Sản phẩm được sản xuất theo công nghệ tiên tiến, đảm bảo chất lượng và hiệu quả tối ưu cho người sử dụng.",
  };

  // Load listProducts from localStorage on component mount
  useEffect(() => {
    const savedListProducts = localStorage.getItem("listProducts");
    if (savedListProducts) {
      setListProducts(JSON.parse(savedListProducts));
    }
  }, []);

  // const { data: dataProduct, isFetching } = useQuery(
  //   ["getDetailProduct", idProduct],
  //   async () => {
  //     const res = await Base.getDetailProduct(idProduct);
  //     return res;
  //   },
  //   { enabled: !!idProduct }
  // );

  const breadcrumb = [
    {
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      href: "/contact",
      title: (
        <>
          <span className="text-[#2490eb]">Chi tiết sản phẩm</span>
        </>
      ),
    },
  ];

  // Function to add product to cart
  const addToCart = () => {
    // Validate quantity
    if (quantity < 1) {
      message.error("Số lượng không hợp lệ!");
      return;
    }

    // Get current listProducts from localStorage
    const existingListProducts = localStorage.getItem("listProducts");
    let currentListProducts = existingListProducts
      ? JSON.parse(existingListProducts)
      : [];

    // Check if product already exists in listProducts
    const existingProductIndex = currentListProducts.findIndex(
      (item) => item.id === mockProduct.id
    );

    if (existingProductIndex !== -1) {
      // If product exists, update quantity with current input value
      currentListProducts[existingProductIndex].quantity = quantity;
    } else {
      // If product doesn't exist, add new product with current quantity
      currentListProducts.push({
        ...mockProduct,
        quantity: quantity,
      });
    }

    // Save updated listProducts to localStorage
    localStorage.setItem("listProducts", JSON.stringify(currentListProducts));

    // Update state
    setListProducts(currentListProducts);

    // Show success message
    message.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  // Function to buy now
  const buyNow = () => {
    localStorage.setItem(
      "buyNowProducts",
      JSON.stringify([{ ...mockProduct, quantity: quantity }])
    );
    router.push("/shopping/step2");
  };

  // Function to handle quantity increase
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Create tabs for images
  const imageTabs = mockProduct.images.map((image, index) => ({
    key: index.toString(),
    label: `Ảnh ${index + 1}`,
    children: (
      <div className="relative">
        <img
          src={image}
          alt={`${mockProduct.name} - Ảnh ${index + 1}`}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div className="absolute top-4 left-4">
          <Tag color="red" className="font-bold">
            -{mockProduct.discount}%
          </Tag>
        </div>
      </div>
    ),
  }));

  return (
    <div className="pb-24 container-original mx-auto">
      <div className=" gap-6 mt-12  flex justify-center">
        <div className="blog-content  bg-white md:px-0 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />

          {/* Product Detail Section */}
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Image with Tabs */}
            <div className="space-y-4">
              <Tabs
                defaultActiveKey="0"
                items={imageTabs}
                className="product-image-tabs"
                tabPosition="top"
                size="small"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {mockProduct.name}
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockProduct.subDescription}
                </p>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-500">
                    {mockProduct.price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {mockProduct.oldPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Tiết kiệm:{" "}
                  {(mockProduct.oldPrice - mockProduct.price).toLocaleString(
                    "vi-VN"
                  )}
                  đ
                </p>
              </div>

              {/* Quantity Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Số lượng:
                </label>
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
              <div className=" pt-4 flex  gap-3">
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

              {/* Product Description */}
              <Divider />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Mô tả sản phẩm
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {mockProduct.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
