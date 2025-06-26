/// vẽ tiếp
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
import ListCardProduct from "@/components/user/common-component/ListCardProduct";
import ListProduct from "@/components/user/product/ListProduct";

export default function ProductListPage({ params }) {
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
      href: "/product-list",
      title: (
        <>
          <HomeOutlined />
          <span>Trang chủ</span>
        </>
      ),
    },
    {
      title: (
        <>
          <span className="text-[#2490eb]">Danh sách sản phẩm</span>
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
        <div className=" bg-white md:px-0 px-4">
          <Breadcrumb className="my-5" items={breadcrumb} />
          <ListProduct />
        </div>
      </div>
    </div>
  );
}
