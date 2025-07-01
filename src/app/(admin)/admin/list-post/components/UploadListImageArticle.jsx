import React, { useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Image, message, Upload } from "antd"
import FilesRepository from "@/models/FilesRepository"
import { useMutation } from "react-query"

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const UploadListImageArticle = ({ value, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [fileList, setFileList] = useState([])
  const [listImageResponse, setListImageResponse] = useState([])

  useEffect(() => {
    onChange(listImageResponse[0])
  }, [listImageResponse])

  useEffect(() => {
    if (value) {
      setFileList([
        {
          uid: `existing-1`,
          name: `image-1`,
          status: "done",
          url: value,
          thumbUrl: value
        }
      ])
      setListImageResponse([value])
    }
  }, [value])

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)

    // Convert fileList to array of URLs for form value
    // onChange(
    //   newFileList.map((el) => {
    //     if (el.response) {
    //       el.id = el.response.id;
    //       el.fileName = el.response.fileName;
    //     }
    //     return el;
    //   })
    // );
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const uploadFileMutation = useMutation({
    mutationFn: FilesRepository.uploadFile,
    onSuccess: data => {
      setListImageResponse([data])
      message.success("Tải lên thành công")
    },
    onError: error => {
      message.error("Tải lên thất bại")
    }
  })

  const handleInsertFile = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileSize", file.size)
      formData.append("type", 1)
      const res = await uploadFileMutation.mutateAsync(formData)

      onSuccess(res)
    } catch (e) {
      onError("Không tải được")
    }
  }

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        customRequest={handleInsertFile}
        onChange={handleChange}>
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage("")
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default UploadListImageArticle
