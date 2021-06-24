import { Button, Form, Input, message, Modal, Spin } from 'antd'
import { useCallback, useState } from 'react'

import React from 'react'
import { resetPassowrdAPI, resetPassowrRootAPI } from '../../../axios/auth'

export default function ResetPassword(props) {
  const [loading, setLoading] = React.useState(false)
  const [form] = Form.useForm()
  const handelError = useCallback((error) => {
    error.errorFields.forEach((ls) => {
      ls.errors.forEach((ms) => {
        message.error(ms, 1.5)
      })
    })
  }, [])
  const handelFinish = useCallback(
    (values) => {
      setLoading(true)
      if (props.user.role === 'root') {
        resetPassowrRootAPI(
          { user_id: props.userId, new_password: values.new_password },
          props.user.jwt
        )
          .then((rs) => {
            setLoading(false)
            message.success(rs.message, 2).then(() => {
              props.togle()
            })
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      } else {
        resetPassowrdAPI(
          {
            old_password: values.old_password,
            new_password: values.new_password,
          },
          props.user.jwt
        )
          .then((rs) => {
            setLoading(false)
            message.success(rs.message, 2).then(() => {
              props.togle()
            })
          })
          .catch((err) => {
            setLoading(false)
            message.error(err.info, 2)
          })
      }
    },
    [props.user]
  )

  return (
    <Modal
      title="Đổi mật khẩu"
      closable={false}
      destroyOnClose={true}
      visible={props.isShow}
      onCancel={() => {
        props.togle()
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            props.togle()
          }}
        >
          Hủy
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinishFailed={handelError}
          onFinish={handelFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            old_password: '',
            new_password: '',
            re_password: '',
          }}
        >
          {props.user.role !== 'root' && (
            <Form.Item
              label="Mật khẩu cũ"
              name="old_password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu cũ' },
                {
                  min: 7,
                  message: 'Mật khẩu cần dài hơn 6 ký tự',
                },
              ]}
            >
              <Input.Password placeholder="Old password" />
            </Form.Item>
          )}
          <Form.Item
            label="Mật khẩu mới"
            name="new_password"
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              {
                min: 7,
                message: 'Mật khẩu cần dài hơn 6 ký tự',
              },
            ]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="re_password"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Không trùng khớp mật khẩu!'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Re-New password" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}
