import React, { useEffect, useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { handleSrcImg } from "../common/functions/commonFunction";

const UploadImage = (props) => {
  const { onChange, uploadType, imgDetail } = props;

  // uploadType = avatar | null

  const [imageUrl, setImageUrl] = useState();

  const isUploadAvatar = uploadType === "avatar";

  useEffect(() => {
    if (imgDetail) {
      setImageUrl(handleSrcImg(imgDetail));
    }
  }, [imgDetail]);

  const authToken = sessionStorage.getItem("accessToken");

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    // Tạo FormData để gửi dữ liệu tải lên
    const formData = new FormData();
    formData.append("thumnnail_blog", file);

    try {
      // Gửi yêu cầu tải lên bằng Axios
      const response = await axios.post(
        "http://localhost:3017/api/upload/thumbnail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setImageUrl(handleSrcImg(response.data));
      // Gọi hàm onSuccess với thông tin phản hồi từ máy chủ
      onSuccess(response.data);
      onChange && onChange(response?.data);
      // Hiển thị thông báo thành công
      message.success("Upload thành công");
    } catch (error) {
      // Gọi hàm onError khi có lỗi
      onError(error);

      // Hiển thị thông báo lỗi
      message.error("Upload thất bại");
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
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
      <p className="mb-2 font-medium">Ảnh đại diện</p>
      <Upload
        name="avatar"
        listType={isUploadAvatar ? "picture-circle" : "picture-card"}
        className="avatar-uploader"
        showUploadList={false}
        customRequest={handleUpload}
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

export default UploadImage;
