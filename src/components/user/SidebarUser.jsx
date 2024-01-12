"use client";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useQuery } from "react-query";
import Base from "@/app/models/Base";

export default function SidebarUser(props) {
  const { breadcrumb, title } = props;

  // api lấy danh sách tất cả thể loại
  const { data: listCategory } = useQuery(
    ["getAllCateMenu"],
    async () => {
      const res = await Base.getAllCategory();
      return res;
    },
    {}
  );
  const { data: listService } = useQuery(["getListServiceUser"], async () => {
    const res = await Base.getListServicePagination({
      Page: 1,
      Size: 5,
      KeySearch: "",
    });

    return res?.Data;
  });

  return (
    <div className="another col-span-3 ">
      <div className="categories-blog py-8 pl-4">
        <p className="text-3xl mb-4">Thể Loại</p>
        {listCategory?.length &&
          listCategory?.map((category, index) => (
            <p className="my-4" key={index}>
              <Link
                href={`/blog/${category?.Id}`}
                as={`/blog/${category?.Id}`}
                className="capitalize categorie-link transition-all duration-500"
              >
                <FontAwesomeIcon icon={faAngleRight} className="text_ocean" />{" "}
                {category?.Name}
              </Link>
            </p>
          ))}
      </div>

      <div className="categories-blog py-8 pl-4 mt-16">
        <p className="text-3xl mb-4">Dịch Vụ</p>
        {listService?.length &&
          listService?.map((service, index) => (
            <p className="my-4" key={index}>
              <Link
                href={`/service-detail/${service?.Id}`}
                as={`/service-detail/${service?.Id}`}
                className="capitalize categorie-link transition-all duration-500"
              >
                <FontAwesomeIcon icon={faAngleRight} className="text_ocean" />{" "}
                {service?.Name}
              </Link>
            </p>
          ))}
      </div>
      <div className="w-full mt-12">
        <Link href={`/contact`}>
          <img
            src="https://medicate.peacefulqode.com/wp-content/uploads/2022/03/call-img-1.jpg"
            alt=""
            className="w-full"
          />
        </Link>
      </div>
    </div>
  );
}
