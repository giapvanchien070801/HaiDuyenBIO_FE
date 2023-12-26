"use client";

import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import styled from "@emotion/styled";

// Đăng ký module imageResize từ quill-image-resize
Quill.register("modules/imageResize", ImageResize);

const TextEditor = () => {
  const [valueEditor, setValueEditor] = useState("");
  console.log("valueEditor", valueEditor);
  const handleChange = (content, delta, source, editor) => {
    setValueEditor(content);
  };

  const modulesTextEditor = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formatsTextEditor = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const [editorHtml, setEditorHtml] = useState("");

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <CustomQuill>
      <ReactQuill
        className="bg-white "
        value={valueEditor}
        onChange={handleChange}
        modules={modulesTextEditor}
        formats={formatsTextEditor}
      />
    </CustomQuill>
  );
};

const CustomQuill = styled.div`
  & .ql-container {
    min-height: 200px;
  }
`;

export default TextEditor;
