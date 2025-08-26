import { useEffect } from "react"

export default function QuillContent({ content, className = "blog-content", ...props }) {
  useEffect(() => {
    // Đảm bảo CSS React Quill được load
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/react-quill@2.0.0/dist/quill.snow.css"
      link.id = "quill-styles"

      if (!document.getElementById("quill-styles")) {
        document.head.appendChild(link)
      }
    }
  }, [])

  if (!content) {
    return null
  }

  return (
    <div className={`quill-content ql-editor ${className}`} dangerouslySetInnerHTML={{ __html: content }} {...props} />
  )
}
