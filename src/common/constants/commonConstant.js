export const CustomQuillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"] // remove formatting button
  ]
}

export const modulesTextEditor = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ align: [] }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: typeof window !== "undefined" && window.ReactQuill ? window.ReactQuill.Quill.import("parchment") : null,
    modules: ["Resize", "DisplaySize"]
  }
}
// PENDING, PROCESSING, COMPLETED, CANCELLED, UNSET
export const ORDERS_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  UNSET: "UNSET"
}

export const ORDERS_STATUS_COLOR = {
  PENDING: "orange",
  PROCESSING: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
  UNSET: "gray"
}

export const ORDERS_STATUS_TEXT = {
  PENDING: "Chờ xác nhận",
  PROCESSING: "Đang xử lý",
  COMPLETED: "Đã hoàn thành",
  CANCELLED: "Đã hủy",
  UNSET: "Chưa xác nhận"
}

export const LIST_STATUS_ORDER = [
  {
    label: "Chờ xác nhận",
    value: "PENDING"
  },
  {
    label: "Đang xử lý",
    value: "PROCESSING"
  },
  {
    label: "Đã hoàn thành",
    value: "COMPLETED"
  },
  {
    label: "Đã hủy",
    value: "CANCELLED"
  },
  {
    label: "Chưa xác nhận",
    value: "UNSET"
  }
]

// ACTIVE, INACTIVE, DELETED
export const LIST_STATUS_CUSTOMER_CONTACT = [
  {
    label: "Đã xử lý",
    value: "ACTIVE"
  },
  {
    label: "Chưa xử lý",
    value: "INACTIVE"
  }
  // {
  //   label: "Xóa",
  //   value: "DELETED",
  // },
]

export const CUSTOMER_CONTACT_STATUS_COLOR = {
  ACTIVE: "green",
  INACTIVE: "blue"
  // DELETED: "red",
}

export const CUSTOMER_CONTACT_STATUS_TEXT = {
  ACTIVE: "Đã xử lý",
  INACTIVE: "Chưa xử lý"
  // DELETED: "Xóa",
}

export const UPLOAD_FILE_TYPE = {
  BANNER: "BANNER",
  VIDEO: 2,
  AVATAR: "AVATAR",
  ARTICLE: "ARTICLE",
  UNSET: "UNSET"
}
