"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "/src/app/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

export default function AdminLayout({ children }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const location = window.location.href;

  // Xử lý logic kiểm tra trạng thái đăng nhập tại đây
  const isLoggedIn = true; // Thay đổi thành logic kiểm tra đăng nhập

  const isLinkToLogin = () => {
    let isToAdmin = false;

    if (location.split("/").includes("admin") && !isLoggedIn) {
      isToAdmin = true;
    }
    return isToAdmin;
  };

  useEffect(() => {
    // Nếu đường dẫn là /admin và chưa đăng nhập, điều hướng đến trang login
    if (isLinkToLogin()) {
      router.push("/login");
    }
  }, [location]);

  return (
    <html>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
