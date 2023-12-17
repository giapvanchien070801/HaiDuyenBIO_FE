import Head from "next/head";

export const metadata = {
  title: "Trang Quản Trị",
  description: "Quản Lý Website Phòng Khám Hà Nội Lào Cai",
};

export default function AdminLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
