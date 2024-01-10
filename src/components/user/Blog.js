import { HomeOutlined } from "@ant-design/icons";
import BannerBreadcrumb from "@/components/user/BannerBreadcrumb";
import { faComments, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import Comment from "./Comment";

async function getBlog(id) {
  const res = await fetch(
    "https://api.slingacademy.com/v1/sample-data/blog-posts/1"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Blog({ id }) {
  const blog = await getBlog(id);
  const breadCrum = [
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
      href: `/blog`,
      title: (
        <>
          <span className="text-[#2490eb]">Các bài viết</span>
        </>
      ),
    },
    {
      href: ``,
      title: (
        <>
          <span className="text-[#2490eb]">{blog.blog.title}</span>
        </>
      ),
    },
  ];
  return (
    <>
      <BannerBreadcrumb title={blog.blog.title} breadcrumb={breadCrum} />

      <div className="grid xl:grid-cols-10 gap-6 mt-12">
        <div className="content-blog col-span-7">
          <div className="blog-thumbnail relative h-fit">
            <div className="w-full h-96 overflow-hidden">
              <img
                src={`${blog.blog.photo_url}`}
                className="w-full h-full hover:scale-110 transition-all duration-500"
              />
              <div className="time-posted absolute session_ocean2 text-white p-2 bottom-0 left-0 ml-4 mb-4">
                <p className="font-medium">10/01/2023</p>
              </div>
            </div>
          </div>

          <div className="short-content">
            <div className="author-comments border-b-2 py-4">
              <span className="text-xl">
                <FontAwesomeIcon icon={faUser} className="text_ocean" /> Admin{" "}
                <FontAwesomeIcon icon={faComments} className="text_ocean" /> 12
                bình luận
              </span>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: blog.blog.content_html }} />

          <Suspense fallback={<div>Đang tải bình luận ...</div>}>
            <Comment />
          </Suspense>

          <div className="write-comment mt-16">
            <p className="text-4xl font-medium mb-8">Để Lại Bình Luận Của Bạn</p>
            <form className="grid xl:grid-cols-3 xl:gap-4">
              <div className="col-span-1">
                <input
                  placeholder="Họ Và Tên"
                  className="w-full p-4 background-input-comment input-comment"
                />
              </div>

              <div className="col-span-1">
                <input
                  placeholder="Email"
                  className="w-full p-4 background-input-comment transition-all duration-500 input-comment"
                />
              </div>
              <div className="col-span-1">
                <input
                  placeholder="Số Điện Thoại"
                  className="w-full p-4 background-input-comment transition-all duration-500 input-comment"
                />
              </div>

              <div className="col-span-3">
                <textarea
                  className="input-comment w-full p-4 background-input-comment transition-all duration-500"
                  placeholder="Nội dung bình luận"
                  rows={10}
                />
              </div>

              <div className="col-span-1">
                <button className="session_ocean2 text-white py-4 px-8 text-medium font-bold transition-all duration-500 hover:bg-black">
                  Bình Luận
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="another col-span-3">2</div>
      </div>
    </>
  );
}
