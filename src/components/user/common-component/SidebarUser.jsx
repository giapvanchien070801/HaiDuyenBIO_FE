"use client";

import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function SidebarUser(props) {
  const { breadcrumb, title } = props;

  const listCategory = [
    {
      Id: 1,
      Name: "Sức khỏe tiêu hóa",
    },
    {
      Id: 2,
      Name: "Vitamin & khoáng chất",
    },
    {
      Id: 3,
      Name: "Thực phẩm chức năng",
    },
    {
      Id: 4,
      Name: "Thuốc không kê đơn",
    },
    {
      Id: 5,
      Name: "Chăm sóc sức khỏe",
    },
  ];

  const listService = [
    {
      Id: 1,
      Name: "Men vi sinh Bifido",
    },
    {
      Id: 2,
      Name: "Men vi sinh Lacto",
    },
    {
      Id: 3,
      Name: "Men vi sinh Premium",
    },
    {
      Id: 4,
      Name: "Men vi sinh Plus",
    },
    {
      Id: 5,
      Name: "Men vi sinh Gold",
    },
  ];

  return (
    <div className="another col-span-3 lg:block hidden">
      <div className="categories-blog py-8 pl-4">
        <p className="text-3xl mb-4">Bài viết mới nhất</p>
        {listCategory?.map((category, index) => (
          <p className="my-4" key={index}>
            <Link
              href={`/news/${category?.Id}`}
              as={`/news/${category?.Id}`}
              className="capitalize categorie-link transition-all duration-500"
            >
              <RightOutlined className="text_ocean" /> {category?.Name}
            </Link>
          </p>
        ))}
      </div>

      <div className="categories-blog py-8 pl-4 mt-16">
        <p className="text-3xl mb-4">Sản phẩm bán chạy</p>
        {listService?.map((service, index) => (
          <p className="my-4" key={index}>
            <Link
              href={`/product-detail/${service?.Id}`}
              as={`/product-detail/${service?.Id}`}
              className="capitalize categorie-link transition-all duration-500"
            >
              <RightOutlined className="text_ocean" /> {service?.Name}
            </Link>
          </p>
        ))}
      </div>
      <div className="w-full mt-12">
        <Link href={`/contact`}>
          <img src="/images/call-img-1.jpg" alt="alt" className="w-full" />
        </Link>
      </div>
    </div>
  );
}
