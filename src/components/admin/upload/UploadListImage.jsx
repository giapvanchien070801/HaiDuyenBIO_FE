import React, { useState } from "react";
import { Upload, Button, message, Modal } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { handleSrcImg } from "../../../common/functions/commonFunction";
import { useMutation, useQuery } from "react-query";
import Base from "@/models/Base";
import { Cookies } from "react-cookie";

const UploadListImage = () => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { data: listSlider, refetch } = useQuery(
    ["getListSlider"],
    async () => {
      const res = await Base.getAllSlider();
      const dataConvert = res?.map((slider) => {
        return {
          uid: String(slider?.Id),
          name: `slider ${String(slider?.Id)}`,
          status: "done",
          url: handleSrcImg(slider?.ImagePath),
        };
      });

      const listSliderString = res?.map((slider) => slider?.ImagePath);

      setFileList(dataConvert);

      return listSliderString;
    },
    {}
  );

  const cookies = new Cookies();
  const authToken = cookies.get("accessToken");

  const updateSliderMutate = useMutation(Base.updateSlider, {
    onSuccess: () => {
      message.success("Sửa Slider thành công!");
      refetch();
    },
    onError: (e) => {
      message.error("Sửa Slider thất bại!");
    },
  });

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const onRemove = (file) => {
    const itemRemove = `${
      file?.url?.split("/")[file?.url?.split("/")?.length - 2]
    }/${file?.url?.split("/")[file?.url?.split("/")?.length - 1]}`;

    const newListImg = listSlider?.filter((item) => item !== itemRemove);

    updateSliderMutate.mutate(newListImg);
    refetch();

    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ cho phép tải lên file ảnh!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Kích thước ảnh không được vượt quá 2MB!");
      return false;
    }
    return isImage && isLt2M;
  };

  const customRequest = async ({ file, onSuccess }) => {
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

      const newListImg = [...listSlider, response.data];

      updateSliderMutate.mutate(newListImg);
      // Hiển thị thông báo thành công
    } catch (error) {
      // Hiển thị thông báo lỗi
    }

    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
  );

  return (
    <div>
      <Upload
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        onPreview={onPreview}
        onChange={onChange}
        fileList={fileList}
        onRemove={onRemove}
        listType="picture-card"
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal open={previewVisible} onCancel={handleCancel} footer={null}>
        <img alt="Preview" className="w-full" src={previewImage} />
      </Modal>
    </div>
  );
};

export default UploadListImage;
