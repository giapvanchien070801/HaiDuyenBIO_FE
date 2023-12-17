import "../globals.css";

export const metadata = {
  title: "Trang Quản Trị",
  description: "Quản Lý Website Phòng Khám Hà Nội Lào Cai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
