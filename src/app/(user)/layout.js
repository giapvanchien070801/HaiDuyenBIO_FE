import "../globals.css";

export const metadata = {
  description: "Website Phòng Khám Hà Nội Lào Cai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
