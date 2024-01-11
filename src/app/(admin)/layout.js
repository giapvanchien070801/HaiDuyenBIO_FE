"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "/src/app/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { message, notification } from "antd";

export default function AdminLayout({ children }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const pathname = usePathname();

  //kiểm tra trạng thái đăng nhập
  const accessToken = sessionStorage.getItem("accessToken");
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Nếu đường dẫn là /admin và chưa đăng nhập, điều hướng đến trang login
    if (pathname?.split("/").includes("admin") && !accessToken) {
      api["warning"]({
        message: "Bạn chưa đăng nhập",
        description: "Hãy đăng nhập để có quyền truy cập!",
      });
      router.push("/login-admin");
    }

    // trường hợp đã đăng nhập nhưng nhập url login
    if (pathname?.split("/").includes("login-admin") && accessToken) {
      router.push("/admin/home");
    }
  }, [pathname]);

  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        {contextHolder}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
