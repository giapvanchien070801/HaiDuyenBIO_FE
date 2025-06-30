"use client";

import { Pagination, Spin } from "antd";

import TitleList from "./TitleList";
import CardProduct from "./CardProduct";
import CardVideo from "./CardVideo";
import { useQuery } from "react-query";
import { useRef } from "react";
import FilesRepository from "@/models/FilesRepository";

export default function ListVideos() {
  const __pagination = useRef({
    page_num: 1,
    page_size: 10,
    count: 0,
  });
  const {
    data: listVideo,
    refetch,
    isFetching,
  } = useQuery(
    [
      "getListVideoAdmin",
      __pagination.current.page_num,
      __pagination.current.page_size,
    ],
    async () => {
      const res = await FilesRepository.getFiles({
        page: __pagination.current.page_num - 1,
        size: __pagination.current.page_size,
        type: 2,
      });

      return res?.content?.map((item) => ({
        id: item?.id,
        title: item?.description,
        url: item?.externalLink,
        channel: "Hải Duyên Bio",
        views: "10K",
        timestamp: "2 tháng trước",
        avatar: "/images/LOGO.JPG",
      }));
    },
    {
      enabled: true,
    }
  );

  return (
    <div className="container mx-auto pb-14 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <TitleList title="Video chính gốc" />
      <Spin spinning={isFetching}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {listVideo?.map((video) => (
            <CardVideo key={video?.id} video={video} />
          ))}
        </div>
      </Spin>
      <Pagination
        className="flex justify-center my-10"
        total={__pagination.current.count}
        pageSize={__pagination.current.page_size}
        showSizeChanger={false}
        onChange={(page, pageSize) => {
          __pagination.current.page_num = page;
          __pagination.current.page_size = pageSize;
          refetch();
        }}
      />
    </div>
  );
}
