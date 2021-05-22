import React, { useState } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
const axios = require('axios')

const ImageUpload = () => {
  const [fileList, setFileList] = useState([
    /* {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, */
  ])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const dummyRequest = ({ file, onSuccess }) => {
    /*  var formData = new FormData()

    formData.append('file', file)
    axios.post('http://localhost:3000/api/user/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InVzZXIiLCJpYXQiOjE2MjEyNTYyMTMsImV4cCI6MTYyMTM0MjYxM30.xZkLEqJX_3JRcl6sO5fUw-BG2smxsMHSmurV1IXhvWY',
      },
    }) */
    setTimeout(() => {
      onSuccess('ok')
    }, 1000)
  }
  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotate aspect={1.5}>
      <Upload
        maxCount={1}
        customRequest={dummyRequest}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length > 0 ? (
          <img src={fileList[0].url} className="w-full" alt="image" />
        ) : (
          '+ Upload'
        )}
      </Upload>
    </ImgCrop>
  )
}

export default ImageUpload
