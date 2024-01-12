"use client";

import { Button } from "antd";
import { UserOutlined, CommentOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function CardLatestBlog(props) {
  const {
    isListPage,
    time,
    createBy,
    avatar,
    comment,
    description,
    title,
    id,
    categoryId,
  } = props;
  return (
    <div
      className={`${
        isListPage ? "w-[45%] mb-10" : "w-[32%]"
      }   bg-[#F4F6F9] rounded overflow-hidden`}
    >
      <div className="h-[400px] overflow-hidden">
        <img
          src={avatar}
          alt="alt"
          className="w-full h-full object-cover img-card-blog"
        />
      </div>
      <Button
        type="primary"
        className="bg-[#2490eb] text-white  font-semibold ml-5 relative -top-12"
      >
        {time}
      </Button>
      <div className="w-full p-8">
        <div className="flex mb-4">
          <div className="flex items-center">
            <UserOutlined className="text-[#2490eb]" />
            <p className="text-[#666666] font-semibold ml-2">{createBy}</p>
          </div>
          <div className="flex items-center ml-4">
            <CommentOutlined className="text-[#2490eb]" />
            <p className="text-[#666666] font-semibold ml-2">
              {comment} COMMENTS
            </p>
          </div>
        </div>
        <hr />
        <Link
          href={`/blog/${categoryId}/${id}`}
          as={`/blog/${categoryId}/${id}`}
        >
          <p className="text-2xl font-semibold leading-8 mt-4 hover:text-[#2490eb]">
            {title}
          </p>
        </Link>

        <p className="text-[#666666]  mt-4 leading-8 mb-4">{description}</p>

        <Link
          href={`/blog/${categoryId}/${id}`}
          as={`/blog/${categoryId}/${id}`}
        >
          <Button
            type="text"
            onClick={() => {
              router.push("/contact");
            }}
            className=" text-[#2490eb] h-12 p-0  font-semibold flex items-center"
          >
            ĐỌC THÊM <PlusOutlined />
          </Button>
        </Link>
      </div>
    </div>
  );
}
