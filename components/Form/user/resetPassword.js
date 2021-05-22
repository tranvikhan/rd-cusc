import { Button, Form, Input, Modal, Switch } from 'antd'
import { useState } from 'react'

import React from 'react'

export default function ResetPassword() {
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
      title="Đổi mật khẩu"
      closable={false}
      destroyOnClose={true}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel">Hủy</Button>,
        <Button key="save" type="primary">
          Xác nhận
        </Button>,
      ]}
    >
      <ResetPasswordForm />
    </Modal>
  )
}

const ResetPasswordForm = (props) => {
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Form.Item
        label="Mật khẩu cũ"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}
      >
        <Input.Password placeholder="Old password" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu mới"
        name="new_password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
      >
        <Input.Password placeholder="New password" />
      </Form.Item>
      <Form.Item
        label="Nhập lại mật khẩu mới"
        name="re_password"
        rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu mới' }]}
      >
        <Input.Password placeholder="Re-New password" />
      </Form.Item>
    </Form>
  )
}
