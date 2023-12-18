import "../globals.css";
import Link from "next/link";
import layoutUserStyle from "@/styles/layout_user_style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEnvelope, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import UserHeader from "@/components/UserHeader";
import UserFooter from "@/components/UserFooter";

export const metadata = {
  description: "Website Phòng Khám Hà Nội Lào Cai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <UserHeader />
        <main>{children}</main>

        <UserFooter />
      </body>
    </html>
  );
}
