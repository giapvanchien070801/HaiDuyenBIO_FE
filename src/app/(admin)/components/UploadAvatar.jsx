import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useMutation } from "react-query";
import Base from "@/app/models/Base";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const UploadAvatar = (props) => {
  const { onchange, uploadType } = props;

  // uploadType = avatar | null

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const isUploadAvatar = uploadType === "avatar";

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadFileMutate = useMutation(Base.uploadFile, {
    onSuccess: () => {
      message.success("Tải ảnh lên thành công!");
    },
    onError: (e) => {
      console.log("e", e);
      message.error("Tải ảnh lên thất bại!");
    },
  });
  function validateImg(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/x-icon" ||
      file.type === "image/jfif";
    if (!isJpgOrPng) {
      message.error("Định dạng file không được hỗ trợ.");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("File không được quá 10MB");
      return false;
    }
    return true;
  }

  const handleInsertImage = async ({ file, onSuccess, onError }) => {
    try {
      if (validateImg(file)) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await uploadFileMutate.mutateAsync(formData);

        onSuccess();
      }
    } catch (e) {
      onError();
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className="flex flex-col items-center">
      <p className=" mb-2 font-medium">Ảnh đại diện</p>
      <Upload
        name="avatar"
        listType={isUploadAvatar ? "picture-circle" : "picture-card"}
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={handleInsertImage}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};
export default UploadAvatar;
