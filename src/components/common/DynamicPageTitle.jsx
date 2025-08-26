import { useEffect } from 'react'

/**
 * Component để cập nhật tiêu đề trang động
 * @param {string} title - Tiêu đề tùy chỉnh cho trang
 * @param {string} prefix - Tiền tố mặc định (mặc định: "Hai Duyen Bio")
 */
export default function DynamicPageTitle({ title, prefix = "Hai Duyen Bio" }) {
  useEffect(() => {
    if (title) {
      document.title = `${prefix} - ${title}`
    }
  }, [title, prefix])

  return null
}
