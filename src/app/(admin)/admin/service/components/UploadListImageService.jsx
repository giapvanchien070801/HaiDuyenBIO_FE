import React, { useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Image, message, Upload } from "antd"
import FilesRepository from "@/models/FilesRepository"
import { useMutation } from "react-query"
import { UPLOAD_FILE_TYPE } from "@/common/constants/commonConstant"

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const UploadListImageService = ({ value, listImageDetail, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [fileList, setFileList] = useState(value || [])
  const [listImageResponse, setListImageResponse] = useState([])

  useEffect(() => {
    if (listImageDetail && Array.isArray(listImageDetail)) {
      const convertedFileList = listImageDetail.map((url, index) => ({
        uid: `existing-${index}`,
        name: `image-${index}`,
        status: "done",
        url: url,
        thumbUrl: url
      }))
      setFileList(convertedFileList)
      setListImageResponse(listImageDetail)
    }
  }, [listImageDetail])

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.length < listImageResponse.length) {
      onChange(newFileList?.map(item => item.url))
    }

    setFileList(newFileList)
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
      setListImageResponse([...listImageResponse, data])
      onChange([...listImageResponse, data])
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
      formData.append("objectType", UPLOAD_FILE_TYPE.AVATAR)
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
        {fileList.length >= 3 ? null : uploadButton}
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

export default UploadListImageService
