"use client";

import { Breadcrumb } from "antd";

export default function BannerBreadcrumb(props) {
  const { breadcrumb, title } = props;

  return (
    <div className="h-[360px] w-full flex flex-col items-center justify-center banner-contact ">
      <div className="container-original ">
        <p className="mb-4 text-6xl">{title}</p>
        <Breadcrumb items={breadcrumb} />
      </div>
    </div>
  );
}
