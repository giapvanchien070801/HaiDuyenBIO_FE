import "../globals.css";
import UserHeader from "@/components/user/UserHeader";
import UserFooter from "@/components/user/UserFooter";

export const metadata = {
  description: "Website Phòng Khám Hà Nội Lào Cai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Phòng Khám Hà Nội Lào Cai</title>
      </head>
      <body>
        <UserHeader />
        <main>{children}</main>

        <UserFooter />
      </body>
    </html>
  );
}
