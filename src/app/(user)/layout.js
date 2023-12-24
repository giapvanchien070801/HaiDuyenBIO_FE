import "../globals.css";
import UserHeader from "@/components/user/UserHeader";
import UserFooter from "@/components/user/UserFooter";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserHeader />
        <main>{children}</main>
        <UserFooter />
      </body>
    </html>
  );
}
