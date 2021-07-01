import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'

const ImageUpload = (props) => {
  const [myFile, setMyFile] = useState(null)
  React.useEffect(() => {
    if (props.file) {
      handelsetMyFile(props.file)
    } else {
      setMyFile(null)
    }
  }, [props.file])
  React.useEffect(() => {
    if (props.defaultFileURL) {
      setMyFile({
        uid: '-1',
        name: 'default',
        status: 'done',
        url: '/api/' + props.defaultFileURL,
      })
    } else {
      setMyFile(null)
    }
  }, [props.defaultFileURL])

  const onChange = async (file) => {
    if (props.onChange) props.onChange(file)
  }
  const handelsetMyFile = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
      })
    }
    setMyFile({
      uid: '-1',
      name: file.name,
      status: 'done',
      url: src,
    })
  }
  return (
    <ImgCrop rotate aspect={1.5}>
      <Upload
        accept="image/png,image/jpeg"
        maxCount={1}
        action="/assets/img/404 Page Not Found _Two Color.svg"
        method="get"
        listType="picture-card"
        className={
          props.isHomePage ? 'homepage-image-uploader' : 'avatar-uploader'
        }
        showUploadList={false}
        beforeUpload={onChange}
      >
        {myFile ? (
          <img src={myFile.url} className="w-full" alt="image" />
        ) : (
          '+ Upload'
        )}
      </Upload>
    </ImgCrop>
  )
}

export default ImageUpload
