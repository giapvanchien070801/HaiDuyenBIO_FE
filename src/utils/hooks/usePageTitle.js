import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Định nghĩa tiêu đề cho từng trang
const pageTitles = {
  '/': 'Hai Duyen Bio - Trang chủ',
  '/about': 'Hai Duyen Bio - Giới thiệu',
  '/contact': 'Hai Duyen Bio - Liên hệ',
  '/blog': 'Hai Duyen Bio - Tin tức',
  '/news': 'Hai Duyen Bio - Tin tức',
  '/product-list': 'Hai Duyen Bio - Sản phẩm',
  '/service-detail': 'Hai Duyen Bio - Dịch vụ',
  '/list-videos': 'Hai Duyen Bio - Video',
  '/add-appointment': 'Hai Duyen Bio - Đặt lịch',
  '/check-shopping': 'Hai Duyen Bio - Giỏ hàng',
  '/shopping': 'Hai Duyen Bio - Thanh toán',
  '/admin': 'Hai Duyen Bio - Admin',
  '/admin/home': 'Hai Duyen Bio - Admin Dashboard',
  '/admin/accounts-admin': 'Hai Duyen Bio - Quản lý tài khoản',
  '/admin/customer-contact': 'Hai Duyen Bio - Liên hệ khách hàng',
  '/admin/ingredient': 'Hai Duyen Bio - Quản lý nguyên liệu',
  '/admin/list-employee': 'Hai Duyen Bio - Quản lý nhân viên',
  '/admin/list-post': 'Hai Duyen Bio - Quản lý bài viết',
  '/admin/machining': 'Hai Duyen Bio - Quản lý gia công',
  '/admin/orders': 'Hai Duyen Bio - Quản lý đơn hàng',
  '/admin/service': 'Hai Duyen Bio - Quản lý dịch vụ',
  '/admin/videos': 'Hai Duyen Bio - Quản lý video',
  '/login-admin': 'Hai Duyen Bio - Đăng nhập Admin'
}

export const usePageTitle = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Tìm tiêu đề phù hợp với đường dẫn hiện tại
    let title = 'Hai Duyen Bio'
    
    // Kiểm tra đường dẫn chính xác
    if (pageTitles[pathname]) {
      title = pageTitles[pathname]
    } else {
      // Kiểm tra đường dẫn động (có tham số)
      const pathSegments = pathname.split('/')
      
      // Xử lý các trang có tham số động
      if (pathSegments[1] === 'blog' && pathSegments[2]) {
        title = 'Hai Duyen Bio - Chi tiết tin tức'
      } else if (pathSegments[1] === 'news' && pathSegments[2]) {
        title = 'Hai Duyen Bio - Chi tiết tin tức'
      } else if (pathSegments[1] === 'product-detail' && pathSegments[2]) {
        title = 'Hai Duyen Bio - Chi tiết sản phẩm'
      } else if (pathSegments[1] === 'service-detail' && pathSegments[2]) {
        title = 'Hai Duyen Bio - Chi tiết dịch vụ'
      } else if (pathSegments[1] === 'product-list' && pathSegments[2]) {
        title = 'Hai Duyen Bio - Danh sách sản phẩm'
      } else if (pathSegments[1] === 'shopping' && pathSegments[2]) {
        title = 'Hai Duyen Bio - Thanh toán'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'ingredient' && pathSegments[3] === 'edit' && pathSegments[4]) {
        title = 'Hai Duyen Bio - Chỉnh sửa nguyên liệu'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'ingredient' && pathSegments[3] === 'create') {
        title = 'Hai Duyen Bio - Tạo nguyên liệu mới'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'ingredient' && pathSegments[3] === 'categories-ingredient') {
        title = 'Hai Duyen Bio - Danh mục nguyên liệu'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'service' && pathSegments[3] === 'edit' && pathSegments[4]) {
        title = 'Hai Duyen Bio - Chỉnh sửa dịch vụ'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'service' && pathSegments[3] === 'create') {
        title = 'Hai Duyen Bio - Tạo dịch vụ mới'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'service' && pathSegments[3] === 'categories-service') {
        title = 'Hai Duyen Bio - Danh mục dịch vụ'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'list-post' && pathSegments[3] === 'edit' && pathSegments[4]) {
        title = 'Hai Duyen Bio - Chỉnh sửa bài viết'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'list-post' && pathSegments[3] === 'create') {
        title = 'Hai Duyen Bio - Tạo bài viết mới'
      } else if (pathSegments[1] === 'admin' && pathSegments[2] === 'list-post' && pathSegments[3] === 'categories-post') {
        title = 'Hai Duyen Bio - Danh mục bài viết'
      }
    }

    // Cập nhật tiêu đề trang
    document.title = title
  }, [pathname])

  return null
}
