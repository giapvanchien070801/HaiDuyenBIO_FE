import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = (props) => {
  const { onChange, valueDetail } = props;
  const [valueEditor, setValueEditor] = useState("");
  const onChangeEditor = (value) => {
    setValueEditor(value);
    onChange(value);
  };

  useEffect(() => {
    if (valueDetail) {
      setValueEditor(valueDetail);
    }
  }, [valueDetail]);

  return (
    <CustomQuill>
      <ReactQuill
        value={valueEditor}
        className="bg-white"
        theme="snow"
        onChange={onChangeEditor}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
    </CustomQuill>
  );
};

// Modules and formats configuration for React Quill
TextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

TextEditor.formats = [
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
const CustomQuill = styled.div`
  & .ql-container {
    min-height: 200px;
  }
`;

export default TextEditor;
