"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamic import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>
})

const TextEditor = props => {
  const { onChange, valueDetail } = props
  const [valueEditor, setValueEditor] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("react-quill/dist/quill.snow.css")
    }
  }, [])

  const onChangeEditor = value => {
    setValueEditor(value)
    onChange(value)
  }

  useEffect(() => {
    if (valueDetail) {
      setValueEditor(valueDetail)
    }
  }, [valueDetail])

  if (!isClient) {
    return <div>Loading editor...</div>
  }

  return (
    <div style={{ minHeight: 200 }}>
      <ReactQuill
        value={valueEditor}
        className="bg-white"
        theme="snow"
        onChange={onChangeEditor}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        placeholder="Nhập nội dung..."
      />
    </div>
  )
}

// Modules and formats configuration for React Quill
TextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6, false] }, { font: [] }],
    [{ size: [] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code", // Thêm code
      "code-block", // Thêm code-block
      "script", // Thêm script
      { script: "sub" }, // subscript
      { script: "super" } // superscript
    ],
    [
      { color: [] }, // Thêm màu chữ
      { background: [] } // Thêm màu nền
    ],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [
      { align: [] }, // Thêm chức năng căn trái, phải, giữa
      { direction: "rtl" } // Thêm hỗ trợ RTL
    ],
    [
      "link",
      "image",
      "video",
      "formula" // Thêm công thức toán học
    ],
    ["clean"]
  ]
}

TextEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code",
  "code-block",
  "script",
  "sub",
  "super",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "align",
  "direction",
  "link",
  "image",
  "video",
  "formula"
]

export default TextEditor
