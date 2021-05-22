import { Button, Form, Input, Modal, Switch } from 'antd'
import { useState } from 'react'
import ImageUpload from '../../Upload/imageUpload'
import React from 'react'

export default function NewApplication() {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [loading, setLoading] = React.useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Modal
      title="Thêm ứng dụng mới"
      closable={false}
      destroyOnClose={true}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel">Hủy</Button>,
        <Button key="save" type="primary">
          Lưu
        </Button>,
      ]}
    >
      <ApplicationForm />
    </Modal>
  )
}

const ApplicationForm = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Form.Item
        label="Tên ứng dụng (vi)"
        name="name_vi"
        rules={[
          { required: true, message: 'Vui lòng nhập tên ứng dụng tiếng Việt' },
        ]}
      >
        <Input placeholder="Nhập tên ứng dụng tiếng Việt" />
      </Form.Item>
      <Form.Item
        label="Tên ứng dụng (en)"
        name="name_en"
        rules={[
          { required: true, message: 'Vui lòng nhập tên ứng dụng tiếng Anh' },
        ]}
      >
        <Input placeholder="Nhập tên ứng dụng tiếng Anh" />
      </Form.Item>
      <Form.Item
        label="Đường dẫn"
        name="domain"
        rules={[{ required: true, message: 'Vui lòng nhập đường dẫn' }]}
      >
        <Input placeholder="url" />
      </Form.Item>

      <Form.Item
        label="Ảnh ứng dụng"
        name="image"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập ảnh dứng dụng',
          },
        ]}
      >
        <ImageUpload />
      </Form.Item>
      <Form.Item name="show" label="Hiển thị công khai" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  )
}
