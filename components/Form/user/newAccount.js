import { Button, Form, Input, Modal, Switch } from 'antd'
import { useState } from 'react'
import ImageUpload from '../../Upload/imageUpload'

import React from 'react'

export default function NewAccount() {
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
      title="Tạo tài khoản mới"
      closable={false}
      destroyOnClose={true}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel">Hủy</Button>,
        <Button key="save" type="primary">
          Thêm
        </Button>,
      ]}
    >
      <NewAccountForm />
    </Modal>
  )
}

const NewAccountForm = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Form.Item
        label="Tên thành viên (vi)"
        name="name_vi"
        validateStatus="success"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên thành viên tiếng Việt',
          },
        ]}
      >
        <Input placeholder="Nhập tên thành viên tiếng Việt" />
      </Form.Item>
      <Form.Item
        label="Tên thành viên (en)"
        name="name_en"
        rules={[
          { required: true, message: 'Vui lòng nhập tên thành viên tiếng Anh' },
        ]}
      >
        <Input placeholder="Nhập tên thành viên tiếng Anh" />
      </Form.Item>
      <Form.Item
        validateStatus="success"
        label="Tên đăng nhập"
        name="username"
        hasFeedback
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
    </Form>
  )
}
